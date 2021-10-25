import {AbstractPageManager} from "./abstractPageManager";
import css from "!css-loader!sass-loader!./popup.scss";

const badWords = ["login", "signin"]

export class DefaultPageManager extends AbstractPageManager {
    lastEvent = null;

    isEnabled() {
        return new Promise(r => chrome.storage.local.get(['enabled'], x => r(x?.enabled ?? true)))
    }

    init() {
        this.document.addEventListener('input', e => this.inputChanged(e, e.target))
        this.document.addEventListener('change', e => this.inputChanged(e, e.target))
    }

    async inputChanged(e, input) {
        if (!await this.isEnabled()) return;
        if (this.lastEvent?.value == input.value) return;
        if (!this.allowedFiled(input)) return;
        const regxE = /^[^@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const regxP = /^[+\s\(\)-]*([\s\(\)-]*\d){6,}[\s\(\)-]*$/;
        if (!regxP.test(input.value) && !regxE.test(input.value)) return;
        this.lastPopup?.remove();
        this.lastEvent = {event: e, date: new Date(), input: input, value: input.value}
        setTimeout(() => this.checkInputChanged(), 500)
    }

    allowedFiled(input) {
        if (badWords.some(w => this.document.location.toString().toLowerCase().includes(w))) return false;
        if (input.type === 'password') return false;
        let node = input;
        while (node) {
            if (this.hasBadWord(node)) return false;
            node = node.parentNode;
        }
        return true;
    }

    hasBadWord(node) {
        if (node?.attributes) {
            for (const attribute of Array.from(node.attributes)) {
                if (badWords.some(w => attribute.name.toLowerCase().includes(w) || attribute.value.toLowerCase().includes(w))) return true;
            }
        }
        return false;
    }

    async checkInputChanged() {
        if (new Date() - this.lastEvent?.date >= 500 && this.lastEvent?.input.value == this.lastEvent?.value && this.lastEvent?.value.length >= 3) {
            let event = this.lastEvent;
            let data = await this.apiCall(this.lastEvent?.value);
            if (data && Object.values(data.result).length > 0 && event == this.lastEvent) {
                this.showPopup(this.lastEvent.input, this.lastEvent.value, data.result);
            }
        }
    }


    showPopup(input, key, elements) {
        this.lastPopup?.remove();
        let div = this.document.createElement('div');
        this.lastPopup = div;
        this.generatePopupContent(div, key, elements, (value) => {
            navigator.clipboard.writeText(value)
            input.value = value;
            input.focus();
            let lastPopup = this.lastPopup;
            setTimeout(() => lastPopup?.remove(), 100);
            let entries = Object.entries(input);
            for (const [key, value] of entries) {
                if (key.startsWith('__reactEventHandlers$')) {//for react
                    input[key].onChange({target: input});
                }
            }
        })
        let blurHandler = () => {
            setTimeout(() => div.remove(), 500);
            input.removeEventListener('blur', blurHandler)
        }
        input.addEventListener('blur', blurHandler)
        this.document.body.append(div);
        let rect = input.getBoundingClientRect()
        div.style.position = 'absolute';
        div.style.left = rect.left + 'px';
        div.style.top = rect.top + rect.height + 'px';
        div.style.width = rect.width + 'px';
        div.style.minWidth = '400px';
        div.style.zindex = 1000000;

    }

}