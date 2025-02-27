import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

//======Выпадающее меню "скачать"====///
const template = document.querySelector('[data-download="template"]');
if (template) {
	tippy('[data-download="download"]', {
		content: template.innerHTML,
		offset: [0, 10],
		allowHTML: true,
		interactive: true,
		theme: 'light',
		placement: 'bottom',
		arrow: true,
		trigger: 'click',
		maxWidth: 109
	});
}

//======Выпадающее меню "редактировать/ удалить"====///
const menu = document.querySelector('[data-menu="menu"]');
if (menu) {
	tippy('[data-menu="menu-open"]', {
		content: menu.innerHTML,
		offset: [20, 10],
		allowHTML: true,
		appendTo: 'parent',
		interactive: true,
		theme: 'light',
		placement: 'right',
		arrow: true,
		trigger: 'click',
		maxWidth: 160,
		onShown(instance) {
			document.querySelector('[data-tippy-root]').addEventListener('click', event => {
				instance.hide();
			})
		}

	});
}

//======Выпадающее меню "сортировка"====///
const sort = document.querySelector('[data-sort="sort"]');
if(sort) {
	tippy('[data-open="sort"]', {
		content: sort.innerHTML,
		offset: [20, 10],
		allowHTML: true,
		appendTo: 'parent',
		interactive: true,
		theme: 'light',
		placement: 'bottom',
		arrow: true,
		trigger: 'click',
		maxWidth: 200

	});
}

//======Выпадающее меню "выход"====///
const exit = document.querySelector('[data-exit="template"]');
if(exit) {
	tippy('[data-open="profile-exit"]', {
		content: exit.innerHTML,
		offset: [20, 10],
		allowHTML: true,
		appendTo: 'parent',
		interactive: true,
		theme: 'light',
		placement: 'bottom',
		arrow: true,
		trigger: 'click',
		maxWidth: 160

	});
}
