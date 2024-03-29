(function (global) {
    "use strict";

    const callApi = ({ methodName, data }) => {    
        return new Promise((resolve, reject) => 
        {
            global.PostComponents(
                methodName,
                data,
                (response) => {
                    resolve(response)
                }
            )
        });
    }

    class _data 
    {
        constructor() {};

        async _allData()
        {
            return await callApi({
                methodName: "allData",
                data: null,
            });
        }

        async setUser(_data)
        {
            return await callApi({
                methodName: "setUser",
                data: _data,
            });
        }


        async getIp()
        {
            return new Promise((resolve, reject) => 
            {
                $.getJSON('https://json.geoiplookup.io/', function(data) {
                    resolve(data);
                });
            });
        }

        async getUser()
        {
            var _token  = _getCookie('token');
            var detect  = new MobileDetect(window.navigator.userAgent);
            var status  = null;

            if(_token)
            {
                status = _token;
            }

            var _data = 
            {
                type: status,
                dataIp: await this.getIp(),
                userAgent: navigator.userAgent.toLowerCase(),
                detectData: {
                    "Mobile" :detect.mobile(),
                    "Phone": detect.phone(),
                    "Tablet": detect.tablet(),
                    "OS": detect.os(),
                    "userAgent": detect.userAgent(),
                },
            };
            var _token = await this.setUser(_data);
            return _token;
        }

        async render()
        {
            // var allData         = await this._allData();
            // allData.token       = await this.getUser();
            // setCookie('token', allData.token);
            // return allData;
        }
    }

    class news
    {
        constructor() {};

        async render()
        {
            var _news = await callApi({
                methodName: "_news",
                data: null,
            });

            var newsBlock = $(`
                <div class="index_page_body_block_news_body">
                    <div class="index_page_body_block_news_row">
                        <h1>Финансовые новости</h1>

                        <div class="index_page_body_block_news">
                            <div class="news_block">
                                <div class="news_block_menu">
                                    <div class="news_block_menu_line" data="1">
                                        <span></span>
                                        <p></p>
                                    </div>
                                    <div class="news_block_menu_line" data="2">
                                        <span></span>
                                        <p></p>
                                    </div>
                                    <div class="news_block_menu_line" data="3">
                                        <span></span>
                                        <p></p>
                                    </div>
                                </div>
                                <div class="news_block_body">
                                    <div class="news_block_body_img">
                                        <img src="" alt="">
                                    </div>
                                    <span></span>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            newsBlock.find('.news_block_menu_line[data="1"] span').html(_news[0].data.title._text);
            newsBlock.find('.news_block_menu_line[data="1"] p').html(_news[0].data.description._text);

            newsBlock.find('.news_block_menu_line[data="2"] span').html(_news[1].data.title._text);
            newsBlock.find('.news_block_menu_line[data="2"] p').html(_news[1].data.description._text);

            newsBlock.find('.news_block_menu_line[data="3"] span').html(_news[2].data.title._text);
            newsBlock.find('.news_block_menu_line[data="3"] p').html(_news[2].data.description._text);

            newsBlock.find('.news_block_body_img img').attr("src", _news[3].data.image_nees);
            newsBlock.find('.news_block_body span').html(_news[3].data.title._text);
            newsBlock.find('.news_block_body p').html(_news[3].data.description._text);

            $('.index_page').append(newsBlock);
        }
    }

    class best
    {
        constructor() {
            this.global_block = $(`
                <div class="index_page_body">
                    <div class="index_page_body_block">
                        <div class="index_page_body_block_h">
                            <h1>Лучшие микрозаймы</h1>
                            <div class="index_page_body_block_h_arrow">
                                <span>Посмотреть все</span>
                                <i class="fal fa-chevron-right"></i>
                            </div>
                        </div>
                        

                        <div class="index_page_body_block_present">

                            

                        </div>
                    </div>
                </div>
            `);
        };

        async render()
        {
            var getBest = await callApi({
                methodName: "getBest",
                data: null,
            });

            this.global_block.find('.index_page_body_block_present').css('flex-wrap', 'wrap');
            this.global_block.find('.index_page_body_block').css('margin', '0');
            this.global_block.css('padding-bottom', "60px");

            var _this       = this;
            var _width      = document.documentElement.clientWidth;
            var _many       = 5;
            var _manyNow    = 0;

            if(_width < "1400")
            {
                _many = 8;
            }

            if(_width < "1150")
            {
                _many = 6;
            }

            getBest.forEach(function(el) 
            {
                _manyNow++;

                if(_manyNow <= _many)
                {
                    var time = el.data.time;

                    if(time <= 5)
                    {
                        time = `<green>до ${time} минут</green>`;
                    }
    
                    if(time <= 15 && time >= 6)
                    {
                        time = `<yellow>до ${time} минут</yellow>`;
                    }
    
                    if(time >= 16)
                    {
                        time = `<red>до ${time} минут</red>`;
                    }
    
    
                    var _block = $(`
                        <div class="index_page_body_block_present_block default_style_block" data="${el.url_guruleads}">
                            <div class="index_page_body_block_present_block_img">
                                <img src="${el.img}" alt="">
                            </div>
                            <div class="index_page_body_block_present_block_info">
                                <div class="index_page_body_block_present_block_info_line">
                                    <a>Сумма</a>
                                    <span>${el.data.min_money} ₽ – ${el.data.max_money} ₽</span>
                                </div>
                                <div class="index_page_body_block_present_block_info_line">
                                    <a>Время</a>
                                    <span>${time}</span>
                                </div>
                                <div class="index_page_body_block_present_block_info_line">
                                    <a>Срок</a>
                                    <span>${el.data.min_date} – ${el.data.max_date} дней</span>
                                </div>
                                <div class="index_page_body_block_present_block_info_line">
                                    <a>Ставка</a>
                                    <span>от ${el.data.procent}%</span>
                                </div>
                            </div>
                        </div>
                    `);
    
                    _block.click( function() {
                        location.href = $(this).attr('data');
                    })
    
                    _this.global_block.find('.index_page_body_block_present').append(_block);
    
                    $('.index_page').append(_this.global_block);
                }           
            })
        }
    }

    class moneys_data
    {
        constructor() {};

        async render() 
        {
            var _cbr = global.all_data.cbr.Valute;

            var _block = $(`
                <div class="index_page_body_rates_left">
                    <div class="index_page_body_rates_block">
                        <a>USD</a>
                        <span>${_cbr.USD.Value}</span>
                    </div>
                    <div class="index_page_body_rates_block">
                        <a>EUR</a>
                        <span>${_cbr.EUR.Value}</span>
                    </div>
                </div>
                <div class="index_page_body_rates_right">
                    <span>Конвертер Валют</span>
                </div>
            `);

            $('.index_page_body_rates').append(_block);
        }
    }

    class bottom
    {
        constructor() {};

        async render()
        {
            var block = $(`
                <div class="index_page_bottom">
                    <div class="index_page_bottom_row">
                        <div class="index_page_header_upper_logo">
                            <span>
                                <a></a>
                                <a></a>
                                <a></a>
                                <a></a>
                            </span>
                            <div class="index_page_header_upper_logo_info">
                                <a>ВЫБЕРИ</a> <br>
                                <c>STORE</c>
                            </div>
                        </div>
                        <div class="index_page_bottom_social">
                            <div class="index_page_header_upper_right_row">
                                <div class="index_page_header_upper_right_button" data="telegram">
                                    <i class="fab fa-telegram-plane"></i>
                                </div>
                                <div class="index_page_header_upper_right_button" data="instagram">
                                    <i class="fab fa-instagram"></i>
                                </div>
                                <div class="index_page_header_upper_right_button" data="vkontakte">
                                    <i class="fab fa-vk"></i>
                                </div>
                            </div>
                        </div>
                        <p>2021 ©</p>
                    </div>
                </div>
            `);

            block.find('.index_page_header_upper_right_button[data="instagram"]').click( function() {
                var _alerts = new alerts();
                _alerts.put('instagram');
                window.open("https://instagram.com/vyberistore.ru?utm_medium=copy_link");
            })

            block.find('.index_page_header_upper_right_button[data="telegram"]').click( function() {
                var _alerts = new alerts();
                _alerts.put('telegram');
                window.open("https://t.me/vyberi_store");
            })

            block.find('.index_page_header_upper_right_row').css({
                "margin": "0 auto",
                "width": "fit-content",
                "margin-top": "20px",
            })

            block.find('.index_page_header_upper_logo').css('color', 'white');
            block.find('.index_page_header_upper_logo').css('text-align', 'left');
            block.find('.index_page_header_upper_right_button').css('color', 'white');

            $('.index_page').append(block);
        }
    }

    class header
    {
        constructor() {};

        async render(data)
        {
            var _block = $(`
                <div class="header_menu_block">
                    <div class="index_page_header_upper">
                        <div class="index_page_header_upper_logo">
                            <span>
                                <a></a>
                                <a></a>
                                <a></a>
                                <a></a>
                            </span>
                            <div class="index_page_header_upper_logo_info">
                                <a>ВЫБЕРИ</a> <br>
                                <c>STORE</c>
                            </div>
                        </div>
                        <div class="index_page_header_upper_centr">
                            <div class="index_page_header_upper_centr_row">
                                <div class="index_page_header_upper_centr_button">
                                    <span>Партнерам</span>
                                </div>
                                <a></a>
                                <div class="index_page_header_upper_centr_button" data="help">
                                    <span>Поддержка</span>
                                </div>
                            </div>
                        </div>
                        <div class="index_page_header_upper_right">
                            <div class="index_page_header_upper_right_row">
                                <div class="index_page_header_upper_right_button" data="telegram">
                                    <i class="fab fa-telegram-plane"></i>
                                </div>
                                <div class="index_page_header_upper_right_button" data="instagram">
                                    <i class="fab fa-instagram"></i>
                                </div>
                                <div class="index_page_header_upper_right_button" data="vkontakte">
                                    <i class="fab fa-vk"></i>
                                </div>
                            </div>
                        </div>
                        <div class="index_page_header_upper_menu">
                            <div class="index_page_header_upper_menu_row">
                                <span>
                                    <a></a>
                                    <a></a>
                                    <a></a>
                                </span>
                            </div>
                        </div>
                    </div>   
                    <div class="header_menu_block_buttons">
                        <div class="header_menu_block_buttons_line" data="help">
                            <span>Новости</span>
                        </div>
                        <div class="header_menu_block_buttons_line" data="help">
                            <span>Поддержка</span>
                        </div>
                        <div class="header_menu_block_buttons_line" data="more">
                            <span>Партнерам</span>
                        </div>
                    </div>
                </div>
                <div class="index_page_header">
                    <img src="./assets/images/image.png" alt="" class="image_logo">
                    <div class="index_page_header_upper">
                        <div class="index_page_header_upper_logo">
                            <span>
                                <a></a>
                                <a></a>
                                <a></a>
                                <a></a>
                            </span>
                            <div class="index_page_header_upper_logo_info">
                                <a>ВЫБЕРИ</a> <br>
                                <c>STORE</c>
                            </div>
                        </div>
                        <div class="index_page_header_upper_centr">
                            <div class="index_page_header_upper_centr_row">
                                <div class="index_page_header_upper_centr_button" data="news">
                                    <span>Новости</span>
                                </div>
                                <div class="index_page_header_upper_centr_button" data="partner">
                                    <span>Стать партнером</span>
                                </div>
                                <div class="index_page_header_upper_centr_button" data="help">
                                    <span>Поддержка</span>
                                </div>
                            </div>
                        </div>
                        <div class="index_page_header_upper_right">
                            <div class="index_page_header_upper_right_row">
                                <div class="index_page_header_upper_right_button" data="telegram">
                                    <i class="fab fa-telegram-plane"></i>
                                </div>
                                <div class="index_page_header_upper_right_button" data="instagram">
                                    <i class="fab fa-instagram"></i>
                                </div>
                                <div class="index_page_header_upper_right_button" data="vkontakte">
                                    <i class="fab fa-vk"></i>
                                </div>
                            </div>
                        </div>
                        <div class="index_page_header_upper_menu">
                            <div class="index_page_header_upper_menu_row">
                                <span>
                                    <a></a>
                                    <a></a>
                                    <a></a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="index_page_header_body">
                        <div class="index_page_header_body_row">
                            <h1>Супермаркет финансовых <br> услуг</h1>
                            <p>Выберите лучшие микрокредиты от МФО, проверенных нашими экспертами.</p>
                            <div class="index_page_header_body_buttons">
                                <!-- <div class="index_page_header_body_buttons_get">
                                    <i class="fas fa-money-check"></i>
                                    <span>Подобрать</span>
                                </div> -->
                                <div class="index_page_header_body_buttons_settings">
                                    <i class="fas fa-money-check"></i>
                                    <span>Подобрать</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>            
            `);

            if(data)
            {
                if(data.size)
                {
                    var _sizeCSS = 
                    {
                        "min": function()
                        {
                            _block.find('.index_page_header_body').css({display: "none"})
                            _block.css('height', "100px");
                            _block.find('.image_logo').css('display', 'none');
                        }
                    }

                    _sizeCSS[data.size]();
                }
            }

            _block.find('.index_page_header_body_buttons_settings').click( function() {
                location.href = "./?page=members";
            });

            _block.find('.index_page_header_upper_centr_button[data="partner"]').click( function() {
                location.href = "./?page=partner";
            });

            _block.find('.index_page_header_upper_centr_button[data="news"]').click( function() {
                window.open("https://t.me/vyberi_store");
            });

            _block.find('.index_page_header_upper_centr_button[data="help"]').click( function() {
                location.href = "./?page=help";
            });

            _block.find('.index_page_header_upper_right_button[data="instagram"]').click( function() {
                var _alerts = new alerts();
                _alerts.put('instagram');
                window.open("https://instagram.com/vyberistore.ru?utm_medium=copy_link");
            })

            _block.find('.index_page_header_upper_right_button[data="telegram"]').click( function() {
                var _alerts = new alerts();
                _alerts.put('telegram');
                window.open("https://t.me/vyberi_store");
            })

            _block.find('.index_page_header_upper_menu_row span').click( function() {
                $('.header_menu_block').toggleClass('selected');
                $('.index_page_header_upper_menu_row span').toggleClass('selected');
            })

            _block.find('.header_menu_block_buttons_line[data="help"]').click( function() {
                location.href = "./?page=help";
            })

            _block.find('.index_page_header_upper_logo').click( function() {
                location.href = "./";
            })

            $('.index_page').append(_block);
        }
    }

    class close_block
    {
        constructor() {};

        async render(data)
        {
            var _block = $(`
                <div class="close_block">
                    <div class="close_block_row">
                        <div class="close_block_return">
                            <i class="fas fa-chevron-left"></i>
                            <span>НАЗАД</span>
                        </div>
                        <div class="close_block_more_buttons">
                            
                        </div>
                    </div>
                </div>
            `);

            _block.find('.close_block_return').click( function()
            {
                location.href = "./";
            })

            if(data)
            {
                var funs = {
                    "settings": function()
                    {
                        var _blockButton = $(`
                            <div class="close_block_more_buttons_line" data="add_offer">
                                <span>Добавить офера</span>
                            </div>      
                        `);

                        _block.find('.close_block_more_buttons').append(_blockButton);

                        _block.find('.close_block_more_buttons_line').click( function () {
                            location.href = "./?page=settings&more=" + $(this).attr('data');
                        })
                    }
                }

                if(data.type)
                {
                    funs[data.type]();
                }
            }

            $('.index_page').append(_block);
        }
    }

    class intro_members
    {
        constructor() {};

        async render()
        {
            var _block = $(`
                <div class="intro_members">
                    <div class="intro_members_row">
                        <h1>Микрозаймы онлайн</h1>
                        <p>Выберите лучшие микрокредиты от МФО, проверенных нашими экспертами. На 16.11.2021 вам доступно 191 займ со ставкой от 0% в день. Увеличьте шансы на получение денег — отправьте заявку минимум в две МФО.</p>
                        <div class="intro_members_input_block">
                            <div class="intro_members_input_block_inputs">
                                <div class="intro_members_input_block_inputs_more">
                                    <input type="text" placeholder="Выберите сумму" data="money" inputmode="numeric">
                                    <div class="intro_members_input_block_inputs_more_scrolling">
                                        <input type="range" min="1" max="100" value="0" data="scroll_money">
                                    </div>
                                </div>
                                <div class="intro_members_input_block_inputs_more">
                                    <input type="text" placeholder="Срок, дней" data="days" inputmode="numeric">
                                    <div class="intro_members_input_block_inputs_more_scrolling">
                                        <input type="range" min="1" max="100" value="0" data="scroll_date">
                                    </div>
                                </div>
                            </div>
                            <span data="show">Показать</span>
                        </div>
                    </div>
                </div>
            `);   

            _block.find('span[data="show"]').click( function() {
                new all_members().renderType({
                    money: $('input[data="money"]').val(),
                    days: $('input[data="days"]').val()
                });
            })

            _block.find('input[data="scroll_money"]').on('input',function () {
                var iVal = $(this).val();
                $('input[data="money"]').val(iVal * 1000);
            });

            _block.find('input[data="scroll_date"]').on('input',function () {
                var iVal = $(this).val();
                $('input[data="days"]').val(iVal);
            });

            _block.find('input[data="money"]').on('input',function () {
                var iVal = $(this).val();
                if(iVal > 100000)
                {
                    $(this).val(100000);
                }
                $('input[data="scroll_money"]').val(Math.round(iVal / 1000));
            });

            _block.find('input[data="money"]').keypress(function(event){
                event = event || window.event;
                if (event.charCode && event.charCode!=0 && (event.charCode < 48 || event.charCode > 57) )
                  return false;
            });

            $('.index_page').append(_block);
        }
    }

    class all_members
    {
        constructor() 
        {
            this.global_block = $(`
                <div class="index_page_body">
                    <div class="index_page_body_block">
                        <h1>Предложения</h1>

                        <div class="index_page_body_block_present">

                            

                        </div>
                    </div>
                </div>
            `);
        };

        async render()
        {
            var allMembers = await callApi({
                methodName: "getallMembers",
                data: null,
            });

            var _this       = this;

            this.global_block.find('.index_page_body_block_present').css('flex-wrap', 'wrap');

            allMembers.forEach(el => 
            {
                var time = el.data.time;

                if(time <= 5)
                {
                    time = `<green>до ${time} минут</green>`;
                }

                if(time <= 15 && time >= 6)
                {
                    time = `<yellow>до ${time} минут</yellow>`;
                }

                if(time >= 16)
                {
                    time = `<red>до ${time} минут</red>`;
                }


                var _block = $(`
                    <div class="index_page_body_block_present_block default_style_block" data="${el.url_guruleads}">
                        <div class="index_page_body_block_present_block_img">
                            <img src="${el.img}" alt="">
                        </div>
                        <div class="index_page_body_block_present_block_info">
                            <div class="index_page_body_block_present_block_info_line">
                                <a>Сумма</a>
                                <span>${el.data.min_money} ₽ – ${el.data.max_money} ₽</span>
                            </div>
                            <div class="index_page_body_block_present_block_info_line">
                                <a>Время</a>
                                <span>${time}</span>
                            </div>
                            <div class="index_page_body_block_present_block_info_line">
                                <a>Срок</a>
                                <span>${el.data.min_date} – ${el.data.max_date} дней</span>
                            </div>
                            <div class="index_page_body_block_present_block_info_line">
                                <a>Ставка</a>
                                <span>от ${el.data.procent}%</span>
                            </div>
                        </div>
                    </div>
                `);

                _block.click( function() {
                    location.href = $(this).attr('data');
                })

                _this.global_block.find('.index_page_body_block_present').append(_block);
            })
            
            $('.index_page').append(_this.global_block);
        }

        closeBlock() 
        {
            return new Promise((resolve,reject) =>
            {
                $('.index_page_body_block_present').fadeOut("fast", function() {
                    $(this).empty();
                    resolve();
                })
            });
        }

        showBlock()
        {
            return new Promise((resolve,reject) =>
            {
                $('.index_page_body_block_present').fadeIn("fast", function() {
                    resolve();
                })
            });
        }

        async renderType(_data)
        {
            var _money                  = parseInt(_data.money, 10);
            var _days                   = parseInt(_data.days, 10);

            var allMembers = await callApi({
                methodName: "getallMembers",
                data: null,
            });

            var allRedactingMembers     = [];

            if(!isNaN(_money) || !isNaN(_days))
            {
                await this.closeBlock();
            }

            if(!isNaN(_money))
            {
                for(const element in allMembers)
                {
                    var max_money   = parseInt(allMembers[element].data.max_money.replace(/\s/g, ''), 10);
                    var min_money   = parseInt(allMembers[element].data.min_money.replace(/\s/g, ''), 10);

                    if(_money >= min_money && _money <= max_money) {
                        allRedactingMembers.push(allMembers[element]);
                    }
                }
            }

            if(!isNaN(_days))
            {
                if(allRedactingMembers.length > 0) 
                {
                    for(const element in allRedactingMembers)
                    {
                        var min_date   = parseInt(allRedactingMembers[element].data.min_date.replace(/\s/g, ''), 10);
                        var max_date   = parseInt(allRedactingMembers[element].data.max_date.replace(/\s/g, ''), 10);

                        if(_days >= min_date && _days <= max_date) {}
                        else {
                            delete allRedactingMembers[element];
                        }
                    }
                } else {
                    for(const element in allMembers)
                    {
                        var min_date   = parseInt(allMembers[element].data.min_date.replace(/\s/g, ''), 10);
                        var max_date   = parseInt(allMembers[element].data.max_date.replace(/\s/g, ''), 10);

                        if(_days >= min_date && _days <= max_date) {
                            allRedactingMembers.push(allMembers[element]);
                        }
                    }
                }
            }

            allRedactingMembers.forEach((el) => 
            {
                

                var time = el.data.time;

                if(time <= 5)
                {
                    time = `<green>до ${time} минут</green>`;
                }

                if(time <= 15 && time >= 6)
                {
                    time = `<yellow>до ${time} минут</yellow>`;
                }

                if(time >= 16)
                {
                    time = `<red>до ${time} минут</red>`;
                }

                var _block = $(`
                    <div class="index_page_body_block_present_block default_style_block" data="${el.url_guruleads}">
                        <div class="index_page_body_block_present_block_img">
                            <img src="${el.img}" alt="">
                        </div>
                        <div class="index_page_body_block_present_block_info">
                            <div class="index_page_body_block_present_block_info_line">
                                <a>Сумма</a>
                                <span>${el.data.min_money} ₽ – ${el.data.max_money} ₽</span>
                            </div>
                            <div class="index_page_body_block_present_block_info_line">
                                <a>Время</a>
                                <span>${time}</span>
                            </div>
                            <div class="index_page_body_block_present_block_info_line">
                                <a>Срок</a>
                                <span>${el.data.min_date} – ${el.data.max_date} дней</span>
                            </div>
                            <div class="index_page_body_block_present_block_info_line">
                                <a>Ставка</a>
                                <span>от ${el.data.procent}%</span>
                            </div>
                        </div>
                    </div>
                `);

                _block.click( function() {
                    location.href = $(this).attr('data');
                })

                $('.index_page_body_block_present').append(_block);
            });

            await this.showBlock();
        }
    }

    class alerts
    {
        constructor() {};

        async put(_type)
        {
            return await callApi({
                methodName: "setAlert",
                data: {
                    token: _getCookie('token'),
                    type: _type,
                    time: new Date().getTime(),
                },
            });
        }
    }

    class phone
    {
        constructor() {};

        async alert()
        {
            var _block = $(`
                <div class="phone_alert">
                    <div class="phone_alert_close">
                        <i class="fal fa-times"></i>
                    </div>
                    <div class="phone_alert_text">
                        <span>ВыбериStore теперь и в мобильном <br>приложении</span>
                        <div class="phone_alert_text_stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="phone_alert_download">
                        <span>Установить</span>
                    </div>
                </div>
            `);

            _block.find('.phone_alert_close').click( function () {
                $('.phone_alert').remove();
            })

            $('body').append(_block);
        }
    }

    class header_buttons
    {
        constructor() {};

        async render()
        {
            var _block = $(`
                <div class="index_page_body">
                    <div class="header_buttons">
                        <div class="header_buttons_line" data="members">
                            <div class="header_buttons_line_row">
                                <i class="fad fa-sack" style="color: #00AFFF"></i>
                                <span>Микрозаймы</span>
                            </div>
                        </div>
                        <div class="header_buttons_line" data="credits">
                            <div class="header_buttons_line_row">
                                <i class="fad fa-wallet" style="color: #F655A3"></i>
                                <span>Кредиты</span>
                            </div>
                        </div>
                        <div class="header_buttons_line" data="cards">
                            <div class="header_buttons_line_row">
                                <i class="fad fa-credit-card" style="color: #3ABC49"></i>
                                <span>Карты</span>
                            </div>
                        </div>
                        <div class="header_buttons_line" data="mortgage">
                            <div class="header_buttons_line_row">
                                <i class="fad fa-home-heart" style="color: #FF7C53"></i>
                                <span>Ипотека</span>
                            </div>
                        </div>
                        <div class="header_buttons_line" data="auto_credit">
                            <div class="header_buttons_line_row">
                                <i class="fad fa-car-alt" style="color: #C054D3"></i>
                                <span>Авто кредит</span>
                            </div>
                        </div>
                        <div class="header_buttons_line" data="insurance">
                            <div class="header_buttons_line_row">
                                <i class="fad fa-book-open" style="color: #0DD149"></i>
                                <span>Страхование</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            _block.css("padding-bottom", "0");
            _block.find('.header_buttons_line').click( function () {
                location.href = "./?page=" + $(this).attr('data');
            })

            $('.index_page').append(_block);
        }
    }

    class best_cards
    {
        constructor() {
            this.global_block = $(`
                <div class="index_page_body">
                    <div class="index_page_body_block">
 
                        <div class="index_page_body_block_h">
                            <h1>Лучшие Кредитные карты</h1>
                            <div class="index_page_body_block_h_arrow">
                                <span>Посмотреть все</span>
                                <i class="fal fa-chevron-right"></i>
                            </div>
                            
                        </div>

                        <div class="index_page_body_block_present">

                            

                        </div>
                    </div>
                </div>
            `);
        };

        async render()
        {
            var getBestCards = await callApi({
                methodName: "getBestCards",
                data: null,
            });

            var _this = this;

            this.global_block.find('.index_page_body_block_present').css('flex-wrap', 'wrap');
            this.global_block.find('.index_page_body_block_present').css('margin-top', '50px');

            getBestCards.forEach(function(el) 
            {
                var _block = $(`
                    <div class="best_cards default_style_block">
                        <div class="best_cards_img">
                            <img src="${el.img}" alt="">
                        </div>
                    </div>
                `);

                _block.click( function() {
                    location.href = $(this).attr('data');
                })

                _this.global_block.find('.index_page_body_block_present').append(_block);

                $('.index_page').append(_this.global_block);
                           
            })
        }
    }

    class logo_type
    {
        constructor() {};

        async render()
        {
            var _block = $(`
                <div class="logo_type default_style_block">
                    <div class="logo_type_line">
                        <div class="logo_type_line_img">
                            <!-- <img src="./assets/images/fone.png" alt=""> -->
                        </div>
                        <div class="logo_type_line_text">
                            <div class="logo_type_line_text_left">
                                <div class="logo_type_line_text_left_row">
                                    <h1>Подбор кредита</h1>
                                    <p>Подберём банки с высокой вероятностью одобрения</p>
                                    <div class="logo_type_line_text_left_button">
                                        <i class="fad fa-arrow-alt-circle-left"></i>
                                        <span>Подобрать кредит</span>
                                    </div>
                                </div>
                            </div>
                            <div class="logo_type_line_text_rigt">
                                <img src="./assets/images/money.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            `);

            $('.index_page').append(_block);
        }
    }

    if(!global.Components)
    {
        global.Components = {
            _data,
            news,
            best,
            moneys_data,
            bottom,
            header,
            close_block,
            intro_members,
            all_members,
            alerts,
            phone,
            header_buttons,
            best_cards,
            logo_type,
        }
    }

}(window))