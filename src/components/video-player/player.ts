import IComponent from '../common/component';
let styles = require('./player.css');

interface IPlayerOption {
    url: string;
    domAttachedPoint: string | HTMLElement;
    width?: string;
    height?: string;
    autoplay?: boolean;
}

function player(option: IPlayerOption) {
    return new Player(option);
}

class Player implements IComponent {
    templateContainer: HTMLElement;

    constructor(private option: IPlayerOption) {
        this.option = Object.assign(
            {
                width: '100%',
                height: '100%',
                autoplay: false
            },
            this.option
        );
        this.init();
    }

    init() {
        this.createDomTemplate();
        this.registerHandlers();
    }

    createDomTemplate() {
        this.templateContainer = document.createElement('div');
        this.templateContainer.style.width = this.option.width;
        this.templateContainer.style.height = this.option.height;
        this.templateContainer.className = styles.default.player;
        this.templateContainer.innerHTML = `
            <video class="${styles.default['player-content']}" src="${this.option.url}"></video>
            <div class="${styles.default['player-control']}">
                <div class="${styles.default['player-progress']}">
                    <div class="${styles.default['progress-watched']}"></div>
                    <div class="${styles.default['progress-buffered']}"></div>
                    <div class="${styles.default['progress-bar']}"></div>
                </div>
                <div class="${styles.default['play-button']}">
                    <i class="iconfont icon-Play"></i>
                </div>
                <div class="${styles.default['progress-time']}">
                    <span>00:00</span> / <span>00:00</span>
                </div>
                <div class="${styles.default['volume']}">
                    <i class="iconfont icon-sound"></i>
                    <div class="${styles.default['volume-control']}">
                        <div class="${styles.default['volume-now']}"></div>
                        <div class="${styles.default['volume-bar']}"></div>
                </div>
                <div class="${styles.default['fullscreen']}">
                    <i class="iconfont icon-Fullscreenmaximizeexpand"></i>
                </div>
            </div>
        `;
        if (typeof this.option.domAttachedPoint === 'object') {
            this.option.domAttachedPoint.appendChild(this.templateContainer);
        } else {
            document.querySelector(this.option.domAttachedPoint).appendChild(this.templateContainer);
        }
    }

    registerHandlers() {

    }
}

export default player;