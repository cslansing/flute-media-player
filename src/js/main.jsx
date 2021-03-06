import React        from 'react';

import Header       from './components/header';
import Nav          from './components/nav';
import Content      from './components/content';

import mediaStorage from './utils/storage';

var mountNode = document.getElementById('app');

class Main extends React.Component {
    constructor() {
        super();
        this._bind(
            'handleFileSelect',
            'handleFileAdd',
            'handleFileRemove',
            'handleClear',
            'handleNavToggle',
            'handleOptionChange',
            'handleMediaEnd');
        this.state = {
            files: [],
            selectedFile: {},
            navState: 'visible',
            options: {
                autoplay: false
            }
        };
    }

    // TODO: refactor this into a base class
    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    handleFileSelect(file) {
        var self = this;

        if (file.constructor.name === 'FileEntry') {
            file.file(file => self.setState({ selectedFile: file }));
        } else {
            this.setState({ selectedFile: file });
        }
    }

    handleFileAdd(files) {
        files = [].slice.call(files);
        this.setState({ files: this.state.files.concat(files) });
    }

    handleFileRemove(fileIndex) {
        this.setState({
            files: this.state.files
                // not using splice to remove so that the state isnt mutated
                .filter((el, i) => {
                    return i !== fileIndex;
                }),
            selectedFile: this.state.selectedFile.index === fileIndex ? {} : this.state.selectedFile
        });
    }

    handleClear() {
        this.setState({
            files: [],
            selectedFile: {}
        });
    }

    handleNavToggle() {
        this.setState({ navState: this.state.navState === 'visible' ? 'invisible' : 'visible' });
    }

    handleOptionChange(option, value) {
        var options = {};

        options[option] = value;
        this.setState({
            options: options
        });
    }

    handleMediaEnd() {
        var nextFile = this.state.files[this.state.selectedFile.index + 1];

        if (nextFile && this.state.options.autoplay) {
            console.log('playing next file');
            this.setState({
                selectedFile: nextFile
            });
        }
    }

    render() {
        return (
            <div className='main'>
                <Header
                    selectedFile={this.state.selectedFile}
                    handleNavToggle={this.handleNavToggle} />
                <div className='body'>
                    <Nav
                        files={this.state.files}
                        selectedFile={this.state.selectedFile}
                        navState={this.state.navState}
                        options={this.state.options}
                        handleClear={this.handleClear}
                        handleOptionChange={this.handleOptionChange}
                        handleFileSelect={this.handleFileSelect}
                        handleFileAdd={this.handleFileAdd}
                        handleFileRemove={this.handleFileRemove} />
                    <Content
                        selectedFile={this.state.selectedFile}
                        handleMediaEnd={this.handleMediaEnd} />
                </div>
            </div>
        );
    }
}

React.render(
    <Main />,
    mountNode
);
