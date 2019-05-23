import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './Check.css';
import { Panel, Alert, Input, Button, HeaderButton, FormLayout, FixedLayout, Div } from '@vkontakte/vkui';
import Header from './header/Header';
import Icon24Calculator from '../../icons/24/calculator';
import Icon24Check from '../../icons/24/check';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

class Check extends React.Component {  
    constructor (props) {
		super(props);
	
		this.state = {
            fn: '',
            fpd: '',
            fd: '',
            summ: '',
            date: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    } 

    onChange(e) {
        const { name, value } = e.currentTarget;
        switch (name){
            case "fn":
            case "fpd":
            case "fd":
                this.setState({ [name]: value.replace(/[^1-9]/g, '') });
                break;
            case "summ":
                this.setState({ [name]: value.replace(/^[+-]?\d+(\.\d+)?$/, '') });
                break;
        }
      }

    onSubmit(){
        this.props.parent.setState({ popout: 
        <Alert actions={[{
            title: 'Хорошо, я понял(а)',
            autoclose: true,
            style: 'cancel'
        }]}

            onClose={()=>this.props.parent.setState({ popout: null })}>
            <Div><span className="check-alert-title">Вы приняли участие в конкурсе</span></Div>
            <p>Поздравляем! Ваш чек прошел проверку, для розыгрыша "Оригинальный стейк рибай с соусом". Желаем удачи!</p>
        </Alert> })
    }

    render() {
        const { fn, fpd, fd, summ, date } = this.state;
        const { id } = this.props;

		return (
                <Panel id={id}>
                    <Header 
                        left={
                            <HeaderButton onClick={this.props.goBack}>
                                <Icon28ChevronBack/>
                            </HeaderButton>
                            }          
                    />
                    <Div><h1>Введите данные с чека для проверки</h1></Div>
                    <FormLayout>

                        <Input top="Номер фискального накопителя (ФН)" 
                            type="text"
                            name="fn"
                            value={fn}
                            onChange={this.onChange}
                            status={fn.length < 16 ? 'default' : 'error'}
                            bottom={fn.length < 16 ? '' : 'Кол-во цифр должно быть меньше 10'}
                        />

                        <Input top="Фискальный признак документа (ФП/ФПД)" 
                            type="text"
                            name="fpd"
                            value={fpd}
                            onChange={this.onChange}
                            status={fpd.length < 10 ? 'default' : 'error'}
                            bottom={fpd.length < 10 ? '' : 'Кол-во цифр должно быть меньше 10'}
                        />

                        <Input top="Номер фискального документа (ФД)" 
                            type="text"
                            name="fd"
                            value={fd}
                            onChange={this.onChange}
                            status={fd.length < 10 ? 'default' : 'error'}
                            bottom={fd.length < 10 ? '' : 'Кол-во цифр должно быть меньшн 10'}
                        />
                        <Input step="*" top="Сумма (руб)" 
                            name="summ"
                            value={summ}
                            onChange={this.onChange}
                        />
                        <Input type="datetime-local" value="00.00.00 00:00"  top="Дата и время покупки" 
                            name="date"
                            value={date}
                            onChange={this.onChange}
                        />
                        <Div size="xl"></Div>
                        
                        <FixedLayout vertical="bottom">
                            <Div>
                                <Button onClick={this.onSubmit} size="xl"><Icon24Check className="button-icon"/><span>Отправить на проверку</span></Button>
                            </Div>
                        </FixedLayout>
                    </FormLayout>
                </Panel>
        )
    }
}

export default Check;
