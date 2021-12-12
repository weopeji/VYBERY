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

    class partner
    {
        constructor() 
        {
        };

        async render_body()
        {
            var _block = $(` 
                <div class="help_block">
                    <h1>Партнёрский отдел</h1>
                    <p>По вопросам совместных партнёрских проектов пишите или звоните, мы ответим в ближайшее время</p>
                    <div class="help_block_blocks">
                        <div class="help_block_blocks_line">
                            <div class="help_block_blocks_line_block default_style_block">
                                <div class="help_block_blocks_line_block_img">
                                    <span>
                                        <i class="fal fa-mobile-android"></i>
                                    </span>
                                </div>
                                <div class="help_block_blocks_line_block_text">
                                    <span>Телефон</span>
                                    <p>8 966 853 93 79</p>
                                </div>
                            </div>
                            <div class="help_block_blocks_line_block default_style_block">
                                <div class="help_block_blocks_line_block_img">
                                    <span>
                                        <i class="fal fa-envelope"></i>
                                    </span>
                                </div>
                                <div class="help_block_blocks_line_block_text">
                                    <span>Почта</span>
                                    <p>we.opeji@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1>Работа в vyberi.store</h1>
                    <p>Мы очень активно растём и развиваемся, поэтому у нас много вакансий абсолютно в разных сферах. Если не найдёте подходящую или появятся вопросы, пишите или звоните</p>
                    <div class="help_block_blocks">
                        <div class="help_block_blocks_line">
                            <div class="help_block_blocks_line_block default_style_block">
                                <div class="help_block_blocks_line_block_img">
                                    <span>
                                        <i class="fal fa-mobile-android"></i>
                                    </span>
                                </div>
                                <div class="help_block_blocks_line_block_text">
                                    <span>Телефон</span>
                                    <p>8 966 853 93 79</p>
                                </div>
                            </div>
                            <div class="help_block_blocks_line_block default_style_block">
                                <div class="help_block_blocks_line_block_img">
                                    <span>
                                        <i class="fal fa-envelope"></i>
                                    </span>
                                </div>
                                <div class="help_block_blocks_line_block_text">
                                    <span>Почта</span>
                                    <p>we.opeji@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
    
            
            $('.index_page').append(_block);
        }

        async render()
        {
            await this.render_body();
        }
    }

    global.Components.partner = partner;
    

}(window))