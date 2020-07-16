import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
    

    checkNumInputs('input[name="user_phone"]');


    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data 
        });

        return await res.text();
    };

    const clearInputs = (() => {
        inputs.forEach(item => {
            item.value = '';
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessege = document.createElement('div');
            statusMessege.classList.add('status');
            item.appendChild(statusMessege);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessege.textContent = message.success;
                })
                .catch(() => statusMessege.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessege.remove();
                    }, 3000);
                });
        });
    });
};

export default forms;



