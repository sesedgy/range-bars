## Пример выполнения тестового для одной из фирм 
Затраченное время: 3:20

React

[Demo](https://sesedgy.github.io/range-bars/)

### Задачи
* Данные получаем с сервера в формате, кол-во итемов от одного, до бесконечности
* У данных с сервера сумма всех значений не обязательно равна 100, предусмотреть перерасчет данных
* Сумма значений всех итемов всегда равна 100 (Исключение: когда итем 1)
* При увеличении значения одного итема, оно уменьшается у итема с максимальным значением(если таких два, то у первого)
* При уменьшении значения одного итема, оно увеличивается у итема с минимальным значением(если таких два, то у первого)
* В инпут нельзя вводить ничего кроме цифр, точки и запятой, запятая должна заменяться на точку при вводе

### Входные данные
```
[{
	Name: Item 1,
	Percent: 40
},	
{
	Name: Item 2,
	Percent: 0
},	
{
	Name: Item 3,
	Percent: 0
},	
{
	Name: Item 4,
	Percent: 0
},	
{
	Name: Item 5,
	Percent: 0
}]
```

