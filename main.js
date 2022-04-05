const fio = document.querySelector('#fio') // input с ФИО
const phone = document.querySelector('#phone') // input с номером телефона
const email = document.querySelector('#email') // input с электронным адресом
const res = document.querySelector('#res') // пустой блок div для вывода сообщений успешной отправки/ошибок

// сабмит формы
$('.input-container__form').submit(async function (e) {
    e.preventDefault()
    // функция валидации данных
    const getValidValues = () => {
        // регулярные выражения для каждого input-а
        const regexName = /^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)? [А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)?$/
        const regexPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
        const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
       // в случае, если хотя бы одно из введенных значений не валидно выбрасывается ошибка
        if (!regexName.test(document.querySelector('#fio').value) ||
            !regexPhone.test(document.querySelector('#phone').value) ||
            !regexEmail.test(document.querySelector('#email').value.toLowerCase())) {
            res.innerText = 'Ошибка ввода'
            throw new Error()
        }
        // если значения верные, возвращается массив
        return [document.querySelector('#fio').value,
            document.querySelector('#phone').value,
            document.querySelector('#email').value]
    }
    // слушатели на изменения input-ов
    fio.addEventListener('click', getValidValues)
    phone.addEventListener('click', getValidValues)
    email.addEventListener('click', getValidValues)
    // вызов функции и сохранение значений в переменной
    const values = getValidValues()
    // блок try-catch с отправкой запроса
    try {
        const response = await fetch('https://60376bfd5435040017722533.mockapi.io/form', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            // Названия полей в соответствии с заданием
            body: JSON.stringify({name: values[0], phone: values[1], email: values[2]}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // Обработка некоторых возможных ошибок
        if (response.status === 400 || response.status === 404) {
            response.text().then(r => res.innerText = r)
        }
        if(response.status === 201){
            res.innerText = 'Форма успешно отправлена'
        }
    } catch (err) {
        res.innerText = 'Ошибка, попробуйте еще раз'
    }
})
