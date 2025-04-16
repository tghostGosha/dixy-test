export const errorModal = (message) => {
  const mainPage = document.querySelector('.main__page')
  const errorWrapper = document.createElement('div');
  const errorText = message.toString()
  errorWrapper.classList.add('error__modal');
  errorWrapper.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11 21.5C16.799 21.5 21.5 16.799 21.5 11C21.5 5.20101 16.799 0.5 11 0.5C5.20101 0.5 0.5 5.20101 0.5 11C0.5 16.799 5.20101 21.5 11 21.5ZM7.80737 8.89085L9.94037 11.0006L7.80737 13.1089C7.66687 13.2654 7.59662 13.4451 7.59662 13.6481C7.59662 13.8511 7.67087 14.0268 7.81937 14.1753C7.96787 14.3239 8.14362 14.3981 8.34662 14.3981C8.54962 14.3981 8.72937 14.3279 8.88587 14.1874L10.9956 12.0544L13.1054 14.1874C13.3239 14.3909 13.5699 14.4534 13.8434 14.3749C14.1169 14.2964 14.2926 14.1206 14.3706 13.8476C14.4486 13.5746 14.3861 13.3286 14.1831 13.1096L12.0501 10.9998L14.1831 8.8901C14.3866 8.6716 14.4491 8.4256 14.3706 8.1521C14.2921 7.8786 14.1164 7.70285 13.8434 7.62485C13.5704 7.54685 13.3244 7.60935 13.1054 7.81235L10.9956 9.94535L8.88587 7.81235C8.72937 7.67185 8.54962 7.6016 8.34662 7.6016C8.14362 7.6016 7.96787 7.67585 7.81937 7.82435C7.67087 7.97285 7.59662 8.1486 7.59662 8.3516C7.59662 8.5546 7.66687 8.73435 7.80737 8.89085Z" fill="#F56C6C"/>
    </svg>
    <div class="error__modal-text">
      <span>${errorText}</span>
    </div>
    <div class="modal-close" data-modal="error-close">
      <svg class="icon icon--close">
        <use href="/assets/img/svgsprite/sprite.symbol.svg#close"></use>
      </svg>
    </div>
  `;

  mainPage.appendChild(errorWrapper);

  setTimeout(() => {
    mainPage.removeChild(errorWrapper);
  }, 3000);

  document.querySelector('[data-modal="error-close"]').addEventListener('click', function () {
    mainPage.removeChild(errorWrapper);
  });
}