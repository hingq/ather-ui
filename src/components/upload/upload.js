export class UploadModal {
  constructor(el) {
    this.el = document.querySelector(el)
    this.filename = ''

    this.isCopying = false
    this.isUploading = false
    this.progress = 0
    this.progressTimeout = null
    this.state = 0
    this.eventListeners = [] // Initialize

    if (this.el) {
      this.addEvent()
    }
  }
  drop(fn) {
    // drop
    const dropListener = (e) => {
      this.el.classList.remove('drag')
      fn(e)
    }
    this.eventListeners.push({
      element: this.el,
      type: 'drop',
      listener: dropListener
    })
    this.el.addEventListener('drop', dropListener)
  }
  dragHandler(e) {
    this.el.classList.add('drag')
    e.preventDefault()
  }
  addEvent() {
    // button click
    const events = [
      // click
      { element: this.el, type: 'click', listener: this.action.bind(this) },
      {
        element: this.el.querySelector('#file'),
        type: 'change',
        listener: this.fileHandle.bind(this)
      },
      {
        element: this.el,
        type: 'dragover',
        listener: this.dragHandler.bind(this)
      },
      {
        element: this.el,
        type: 'dragleave',
        listener: this.dragHandler.bind(this)
      }
    ]
    events.forEach(({ element, type, listener }) => {
      if (element) {
        element.addEventListener(type, listener)
        this.eventListeners.push({ element, type, listener })
      }
    })
  }
  action(e) {
    this[e.target?.getAttribute('data-action')]?.()
    this.stateDisplay()
  }
  cancel(fn) {
    const base = () => {
      this.isUploading = false
      this.progress = 0
      this.progressTimeout = null
      this.state = 0
      this.stateDisplay()
      this.progressDisplay()
      this.fileReset()
    }

    if (typeof fn === 'function') {
      this.cancel = () => {
        fn()
        base()
      }
    } else {
      base()
    }
  }
  fail(fn) {
    const base = () => {
      this.isUploading = false
      this.progress = 0
      this.progressTimeout = null
      this.state = 2
      this.stateDisplay()
    }
    if (fn) {
      this.fail = () => {
        fn()
      }
    } else {
      this.fail = () => {
        base()
      }
    }
  }
  file() {
    this.el?.querySelector('#file').click()
  }
  fileDisplay(name = '') {
    // update the name
    this.filename = name

    const fileValue = this.el?.querySelector('[data-file]')
    if (fileValue) fileValue.textContent = this.filename

    // show the
    this.el?.setAttribute('data-ready', this.filename ? 'true' : 'false')
  }
  fileHandle(e) {
    const target = e.dataTransfer ? e.dataTransfer : e.target
    const { name } = target.files[0]
    return new Promise(() => {
      if (target?.files.length) {
        //   let reader = new FileReader();
        //   reader.onload = () => {
        //     this.fileDisplay(name);
        //   };
        //   reader.readAsDataURL(target.files[0]);
        this.fileDisplay(name)
        this.fileCallback(target.files[0])
      }
    })
  }
  fileCallback(fn = null) {
    typeof fn === 'function' ? (this.fileCallback = fn) : ''
  }
  fileReset() {
    const fileField = this.el?.querySelector('#file')
    if (fileField) fileField.value = null
    this.fileDisplay()
  }
  progressDisplay() {
    const progressValue = this.el?.querySelector('[data-progress-value]')
    const progressFill = this.el?.querySelector('[data-progress-fill]')
    const progressTimes100 = Math.floor(this.progress * 100)

    if (progressValue) progressValue.textContent = `${progressTimes100}%`
    if (progressFill) progressFill.style.transform = `translateX(${progressTimes100}%)`
  }
  async progressLoop(fn) {
    const base = () => {
      this.progressLoop = () => {
        this.progressDisplay()

        if (this.isUploading) {
          if (this.progress < 1) {
            this.progress += 0.01
            this.progressTimeout = setTimeout(this.progressLoop.bind(this), 50)
          } else if (this.progress >= 1) {
            this.progressTimeout = setTimeout(() => {
              if (this.isUploading) {
                this.success()
                this.stateDisplay()
                this.progressTimeout = null
              }
            }, 250)
          }
        }
      }
    }
    if (typeof fn === 'boolean') {
      this.progressLoop = () => {
        fn()
        base()
      }
    } else {
      base()
    }
  }
  stateDisplay() {
    this.el?.setAttribute('data-state', `${this.state}`)
  }
  success(fn) {
    if (typeof fn === 'function') {
      this.success = () => {
        fn()
        this.isUploading = false
        this.state = 3
        this.stateDisplay()
      }
    } else {
      this.success = () => {
        this.isUploading = false
        this.state = 3
        this.stateDisplay()
      }
    }
  }
  upload(fn = null) {
    const base = () => {
      if (!this.isUploading) {
        this.isUploading = true
        this.progress = 0
        this.state = 1
        this.progressLoop()
      }
    }
    if (fn) {
      this.upload = () => {
        fn()
        base()
      }
    } else {
      this.upload = () => {
        base()
      }
    }
  }
  remove() {
    this.eventListeners.forEach((listener) => {
      this.el?.removeEventListener('click', listener)
      const fileInput = this.el?.querySelector('#file')
      fileInput?.removeEventListener('change', listener)
    })
  }
}
