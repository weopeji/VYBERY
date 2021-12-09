(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./assets/javascript/component.js'], () => {
            global.loadResources(['./assets/javascript/settings.js'], () => {
                Main();
            }); 
        });    
    });

    async function Main()
    {
        const all_data          = new global.Components._data();
        const news              = new global.Components.news();
        const best              = new global.Components.best();
        const bottom            = new global.Components.bottom();
        const header            = new global.Components.header();
        const moneys_data       = new global.Components.moneys_data();
        const close_block       = new global.Components.close_block();
        const intro_members     = new global.Components.intro_members();
        const all_members       = new global.Components.all_members();
        const settings          = new global.Components.settings();
        const alerts            = new global.Components.alerts();
        const phone             = new global.Components.phone();

        global.all_data     = await all_data.render();

        var _page           = _GET('page');

        var render = 
        {
            "members": async function()
            {
                await header            .render({size: "min"});
                await close_block       .render();
                await intro_members     .render();
                await all_members       .render();
                await bottom            .render();

                alerts                  .put('page_members');
            },
            "default": async function()
            {
                await header            .render();
                await best              .render();
                await news              .render();
                await bottom            .render();

                alerts                  .put('page_default');
            },
            "settings": async function()
            {
                await header            .render({size: "min"});
                await close_block       .render();
                await settings          .render();

                alerts                  .put('page_settings');
            },
        }

        if(_page)
        {
            render[_page]();
        } else {
            render["default"]();
        }

        var _widthWindow = global.innerWidth;

        if(_widthWindow <= 930)
        {
            phone.alert();
        }

        $('.preloader').remove();
        
        console.log(global.all_data);
    }

}(window))