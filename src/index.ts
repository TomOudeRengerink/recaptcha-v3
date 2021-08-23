/**
 * Type of form inputs we listen to.
 */
export enum InputTypes {
  text = 'keyup',
  number = 'keyup',
  email = 'keyup',
  radio = 'change',
  checkbox = 'change',
}

/**
 * Implementation to load reCAPTCHA on interaction with a form.
 * This improves the page speed because it will only load the script
 * when their is interaction with a form.
 *
 * Example usage:
 * const recaptcha = new Recaptcha('<site_key>');
 * recaptcha.addForm('HTMLFormElement')
 */
export default class Recaptcha {
  /**
   * Holds the initialized status of reCAPTCHA.
   * @private
   */
  private _initialized: boolean;

  /**
   * reCAPTCHA public site key
   * @protected
   */
  _siteKey!: string;

  /**
   * The form where reCAPTCHA will be initialized.
   * @private
   */
  private _form!: HTMLFormElement;

  /**
   * Set the site key when a new instance of this class is being made.
   * @param siteKey
   */
  constructor(siteKey: string) {
    this._initialized = false;
    this._siteKey = siteKey;
  }

  get siteKey(): string {
    return this._siteKey;
  }

  /**
   * Apply reCAPTCHA to a specific form.
   * @param form
   */
  public addForm(form: HTMLFormElement): void {
    if (!this._initialized) {
      this._form = form;
      this.bindEvents();
    }
  }

  /**
   * Bind the events to the form.
   * @private
   */
  private bindEvents(): void {
    if (this._form.elements) {
      const elements = this._form.elements;

      // @ts-ignore
      for (const element of elements) {
        const type = element.getAttribute('type');
        // When the element has no type do nothing
        if (!type) {
          continue;
        }
        const listener = (<any>InputTypes)[type];
        // When element type has no valid listener we do nothing
        if (!listener) {
          continue;
        }
        this.setEventListener(element, type);
      }
    }
  }

  /**
   * Apply the event listener to the given element.
   * @param element
   * @param type
   * @private
   */
  private setEventListener(element: Element, type: string): void {
    const listener = (<any>InputTypes)[type];
    element.addEventListener(listener, () => {
      if (!this._initialized) {
        // Init reCAPTCHA
        this.initRecaptcha();
      }
    });
  }

  /**
   * Load the reCAPTCHA script.
   * @private
   */
  private initRecaptcha(): void {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=' + this._siteKey;
    head.appendChild(script);
    this._initialized = true;
  }
}
