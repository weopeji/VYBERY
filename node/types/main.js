var XMLHttpRequest      = require("xmlhttprequest").XMLHttpRequest;
var convert             = require('xml-js');
var cheerio             = require('cheerio');

module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        privat_index_page(socket,data,callback);
    }
}

var privat_index_page = function(socket,data,callback) {
    var action = data.action;
    if(typeof action_linker[action] != "undefined") {
        action_linker[action](socket,data.data,callback,data)   
    } else {
        callback({
            error: {
                code:0 //no action
            }
        });
    }
}

function privateInit(initPlagins) 
{
    request = initPlagins.request;
    Member  = initPlagins.Member;
    News    = initPlagins.News;
    User    = initPlagins.User;
}

var action_linker = 
{
    "allData": allData,
    "add_offer": add_offer,
    "setUser": setUser,
    "setAlert": setAlert,
}

async function setAlert(socket,data,callback)
{
    var _User = await User.findOne({_id: data.token});
    var _Actions = _User.Actions;

    if(!_Actions) _Actions = [];

    _Actions.unshift({
        type: data.type,
        time: data.time,
    })

    await User.findOneAndUpdate({_id: data.token}, {Actions: _Actions});
}

async function setUser(socket,data,callback)
{
    if(!data.type)
    {
        var _User = await User.findOne({ips: { "$in" : [data.dataIp.ip]}});

        if(!_User)
        {
            var UserCreate = await User.create({
                ips: [data.dataIp.ip],
                socketId: socket.id,
                data: [data],
                Actions: JSON,
            });
    
            callback(UserCreate._id);
        } else 
        {
            await User.findOneAndUpdate({_id: _User._id}, {
                socketId: socket.id,
            });

            if(_User.data[0].userAgent == data.userAgent)
            {
                callback(_User._id);
            } else {
                var _data   = _User.data;
                _data.unshift(data);
                var UserCreate = await User.findOneAndUpdate({_id: _User._id}, {
                    data: _data,
                });
                callback(_User._id);
            }
        }
    } else {
        var _User   = await User.findOne({_id: data.type});
        var _error  = true;

        await User.findOneAndUpdate({_id: _User._id}, {
            socketId: socket.id,
        });

        _User.ips.forEach(function(el) {
            if(el == data.dataIp.ip)
            {
                _error = false;
            }
        });

        if(_error)
        {
            var _data   = _User.data;
            var _ip     = _User.ips;

            _ip.unshift(data.dataIp.ip);
            _data.unshift(data);

            await User.findOneAndUpdate({_id: _User._id}, {
                ips: _ip,
                data: _data,
            });
            callback(_User._id);
        } else {
            if(_User.data[0].userAgent == data.userAgent)
            {
                callback(_User._id);
            } else {
                var _data   = _User.data;
                _data.unshift(data);
                var UserCreate = await User.findOneAndUpdate({_id: _User._id}, {
                    data: _data,
                });
                callback(_User._id);
            }
        }
    }
}

async function add_offer(socket,data,callback)
{
    await Member.create({
        name: data.name,
        min_money: data.min_money,
        max_money: data.max_money,
        time: data.time,
        min_date: data.min_date,
        max_date: data.max_date,
        procent: data.procent,
        id_guruleads: data.id_guruleads,
        admin_rate: data.admin_rate,
        url_guruleads: data.url_guruleads,
        img: data.img,
    })

    callback('ok');
}

async function getCbr()
{
    var request = new XMLHttpRequest();
    request.open('GET', 'https://www.cbr-xml-daily.ru/daily_json.js', false);
    request.send(null);

    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

async function getNewsPost(many)
{
    return new Promise((resolve,reject) =>
    {   
        var _url    = 'https://news.google.com/rss/search?q=%D0%A4%D0%B8%D0%BD%D0%B0%D0%BD%D1%81%D1%8B&hl=ru&gl=RU&ceid=RU:ru';
        var request = new XMLHttpRequest();
        request.open('GET', _url, false);
        request.send(null);
        var _data   = request.responseText;
        var result  = JSON.parse(convert.xml2json(_data, {compact: true, spaces: 4}));
        var items   = result.rss.channel.item;

        console.log(items);

        var _news   = [];

        for(var i = 0; i < 20; i++) 
        {
            var _item           = items[i];
            var _url            = _item.link._text;
            var request         = new XMLHttpRequest();
            request.open('GET', _url, false);
            request.send(null);
            var _data           = request.responseText;
            var $               = cheerio.load(_data);
            var result          = $('meta[property="og:image"]').attr('content');
            _item.image_nees    = result;

            if(typeof result != "undefined")
            {
                _news.push(_item);
            }

            if(_news.length >= many)
            {
                break;
            }
        }

        resolve(_news);
    });
}

async function getNews(many)
{
    var _time = new Date().getTime();

    var _New = await News.find( {}, { array_field: { $slice: -1 } } );

    if(_New.length <= 0)
    {
        var needNews = await getNewsPost(many);

        console.log(_time);

        for (const element of needNews) 
        {
            await News.create({
                data: element,
                time: _time,
            })
        }

        return await News.find({}).limit(many);
    } else {
        if(_New.time - _time >= 86400000)
        {
            var needNews = await getNewsPost(many);

            for (const element of needNews) 
            {
                await News.create({
                    data: element,
                    time: _time,
                })
            }

            return await News.find({}).limit(many);
        } else
        {
            return await News.find({}).limit(many);
        }
    }
}

async function getBest()
{
    var _Members = await Member.find({}).limit(8);

    return _Members;
}

async function getAllMembers()
{
    var _Members = await Member.find({});
    
    return _Members;
}

async function allData(socket,data,callback)
{
    var all_data = 
    {
        cbr: await getCbr(),
        news: await getNews(4),
        best: await getBest(),
        members: await getAllMembers(),
    };

    callback(all_data);
}