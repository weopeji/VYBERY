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

    class credits
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

        async render_intro()
        {
            var _block = $(`
                <div class="intro_members">
                    <div class="intro_members_row">
                        <h1>Кредитные карты</h1>
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
                                        <input type="range" min="1" max="100" value="0">
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

        async render_body()
        {
            var getallCredits = await callApi({
                methodName: "getallCredits",
                data: null,
            });

            var _this       = this;

            this.global_block.find('.index_page_body_block_present').css('flex-wrap', 'wrap');

            getallCredits.forEach(el => 
            {
                var time = el.data.time;

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

        async render()
        {
            await this.render_intro();
            await this.render_body();
        }
    }

    global.Components.credits = credits;
    

}(window))