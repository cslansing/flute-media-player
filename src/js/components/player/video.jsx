import React from 'react';

class Video extends React.Component {
    constructor() {
        super();
        this._bind(
            'constructVideoEl',
            'destructVideoEl',
            'handleMediaLoaded',
            'handleMediaEnd');
    }

    // TODO: refactor this into a base class
    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    componentDidMount() {
        return this.constructVideoEl(this.props.file);
    }

    componentWillReceiveProps(nextProps) {
        this.destructVideoEl();
        return this.constructVideoEl(nextProps.file);
    }

    componentWillUnmount() {
        this.destructVideoEl();
    }

    constructVideoEl(file) {
        var wrapper = document.createElement('div');
        var video = '<video class="video-js vjs-default-skin" controls preload="auto" autoplay height="100%" width="100%" src="' + URL.createObjectURL(file) + '" type="' + file.type + '"></video>';

        wrapper.innerHTML = video;
        var videoEl = wrapper.firstChild;

        this.refs.target.getDOMNode().appendChild(videoEl);

        videoEl.addEventListener('loadeddata', this.handleMediaLoaded);
        videoEl.addEventListener('ended', this.handleMediaEnd);

        return videojs(videoEl, {});
    }

    destructVideoEl() {
        var target = this.refs.target.getDOMNode();
        var videoEl = target.getElementsByTagName('video')[0];

        videoEl.removeEventListener('loadeddata', this.handleMediaLoaded);
        videoEl.removeEventListener('ended', this.handleMediaEnd);

        while(target.firstChild) {
            target.removeChild(target.firstChild);
        }
    }

    handleMediaLoaded() {
        console.log('video file loaded');
    }

    handleMediaEnd() {
        this.props.handleMediaEnd();
    }

    render() {
        return (
            <div className='comp-player-video' ref='target'></div>
        );
    }
}

export default Video;
