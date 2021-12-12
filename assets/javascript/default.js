(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./assets/javascript/component.js'], () => {
            global.loadResources(['./assets/javascript/settings.js'], () => {
                global.loadResources(['./assets/javascript/cards.js'], () => {
                    global.loadResources(['./assets/javascript/credits.js'], () => {
                        global.loadResources(['./assets/javascript/mortgage.js'], () => {
                            global.loadResources(['./assets/javascript/auto_credit.js'], () => {
                                global.loadResources(['./assets/javascript/insurance.js'], () => {
                                    global.loadResources(['./assets/javascript/partner.js'], () => {
                                        global.loadResources(['./assets/javascript/help.js'], () => {
                                            Main();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
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
        const header_buttons    = new global.Components.header_buttons();
        const best_cards        = new global.Components.best_cards();
        const cards             = new global.Components.cards();
        const logo_type         = new global.Components.logo_type();
        const credits           = new global.Components.credits();
        const mortgage          = new global.Components.mortgage();
        const auto_credit       = new global.Components.auto_credit();
        const insurance         = new global.Components.insurance();
        const partner           = new global.Components.partner();
        const help              = new global.Components.help();

        global.all_data     = await all_data.render();

        var _page           = _GET('page');

        var render = 
        {
            "members": async function()
            {
                await header            .render({size: "min"});
                await intro_members     .render();
                await all_members       .render();
                await bottom            .render();

                alerts                  .put('page_members');
            },
            "default": async function()
            {
                await header            .render({size: "min"});
                await logo_type         .render();
                await header_buttons    .render();
                await best_cards        .render();
                await best              .render();
                await news              .render();
                await bottom            .render();

                alerts                  .put('page_default');
            },
            "settings": async function()
            {
                await header            .render({size: "min"});
                await close_block       .render({type: "settings"});
                await settings          .render();

                alerts                  .put('page_settings');
            },
            "cards": async function()
            {
                await header            .render({size: "min"});
                await cards             .render();

                await bottom            .render();
            },
            "credits": async function()
            {
                await header            .render({size: "min"});
                await credits           .render();

                await bottom            .render();
            },
            "mortgage": async function()
            {
                await header            .render({size: "min"});
                await mortgage          .render();

                await bottom            .render();
            },
            "auto_credit": async function() {
                await header            .render({size: "min"});
                await auto_credit       .render();

                await bottom            .render();
            },
            "insurance": async function() {
                await header            .render({size: "min"});
                await insurance         .render();

                await bottom            .render();
            },
            "partner": async function() {
                await header            .render({size: "min"});
                await partner           .render();

                await bottom            .render();
            },
            "help": async function() {
                await header            .render({size: "min"});
                await help              .render();

                await bottom            .render();
            }
        }

        if(_page)
        {
            render[_page]();
        } else {
            render["default"]();
        }

        // var _widthWindow = global.innerWidth;

        // if(_widthWindow <= 930)
        // {
        //     phone.alert();
        // }

        $('.preloader').remove();
    }

}(window))