document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.form');
    var input = document.querySelector('.input-file');
    var preview = document.querySelector('.form__files');
    var listDeletedItemId = [];

    function returnFileSize(number) {
        if (number < 1024) {
            return number + 'bytes';
        } else if (number >= 1024 && number < 1048576) {
            return (number / 1024).toFixed(1) + 'KB';
        } else if (number >= 1048576) {
            return (number / 1048576).toFixed(1) + 'MB';
        }
    }

    var fileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
    ];

    function validFileType(file) {
        return fileTypes.includes(file.type);
    }

    function deleteImagesDisplay() {
        var item = this.parentElement;
        var id = item.dataset.id;
        item.style.display = 'none';
        listDeletedItemId.push(id);
    }

    function updateImageDisplay() {
        if (parseInt(input.files.length) > 5) {
            alert("Вы выбрали больше 5 файлов");
            return
        }

        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }

        listDeletedItemId = [];
        var curFiles = input.files;
        var list = document.createElement('ul');
        preview.appendChild(list);

        for (var i = 0; i < curFiles.length; i++) {
            var file = curFiles[i];
            var listItem = document.createElement('li');
            var iconDelete = document.createElement('div');
            listItem.dataset.id = i;
            iconDelete.classList.add('icon-delete');
            iconDelete.addEventListener('click', deleteImagesDisplay);
            list.appendChild(listItem);

            if (validFileType(file)) {
                listItem.textContent = file.name;
                listItem.appendChild(iconDelete);
            } else {
                listItem.textContent = file.name;
                list.appendChild(listItem);
            }

            list.appendChild(listItem);
        }
    }

    function isHaveElementInArray(filesId) {
        var result = true;
        for (var i = 0; i < listDeletedItemId.length; i++) {
            if (listDeletedItemId[i] == filesId) {
                result = false;
            }
        }
        return result
    }

    function submitForm() {
        event.preventDefault();
        var formFiles = input.files;
        var formData = new FormData();
        formData.append("name", form.elements.name.value);
        formData.append("phoneNumber", form.elements.phoneNumber.value);
        formData.append("email", form.elements.email.value);
        
        for (var i = 0; i < formFiles.length; i++) {

            if (isHaveElementInArray(i)) {
                formData.append("photo" + i, formFiles[i]);
            }
        }

        var xhr = new XMLHttpRequest;
        xhr.open('POST', '/', true);
        xhr.send(formData);
    }

    input.addEventListener('change', updateImageDisplay);
    form.addEventListener('submit', submitForm)
});

$(document).ready(function () {
    $('.tabs__link').on('click', function() {
        event.preventDefault();

        var scrollPosition = $(this).position().left;
        $('.tabs__nav-scroll').animate({
            scrollLeft: scrollPosition
        }, 1000);

        $('.tabs__link-active').removeClass('tabs__link-active');
        $(this).addClass('tabs__link-active');

        var blockId = $(this).attr('href');

        $('.tabs__item-active').removeClass('tabs__item-active');
        var mobileLink = $('.tabs__link-mobile[href*="' + blockId + '"]');
        var mobileItem = mobileLink.parent('.tabs__item-mobile');
        mobileItem.addClass('tabs__item-active');

        $('.tabs__block-active').removeClass('tabs__block-active');
        $(blockId).addClass('tabs__block-active');
    });

    $('.tabs__item-mobile').on('click', function () {

        $('.tabs__item-active').removeClass('tabs__item-active');
        $(this).addClass('tabs__item-active');

        blockId = $(this).find('.tabs__link-mobile').attr('href');
        
        $('.tabs__link-active').removeClass('tabs__link-active');
        $('.tabs__link[href*="' + blockId + '"]').addClass('tabs__link-active');

        $('.tabs__block-active').removeClass('tabs__block-active');
        $(blockId).addClass('tabs__block-active');
    });

    $('.tabs__link-mobile').on('click', function() {
        event.preventDefault();
    });
})