/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var classNames = require('classnames');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
// var Icon = require('./icon');

var Input = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        type: React.PropTypes.oneOf([
            'color',
            'date',
            'datetime',
            'datetime-local',
            'email',
            'hidden',
            'month',
            'number',
            'password',
            'range',
            'search',
            'tel',
            'text',
            'time',
            'url',
            'week'
        ]),
        immediateValidation: React.PropTypes.bool
        // addonBefore: React.PropTypes.oneOfType([
        //     React.PropTypes.string,
        //     React.PropTypes.node
        // ]),
        // addonAfter: React.PropTypes.oneOfType([
        //     React.PropTypes.string,
        //     React.PropTypes.node
        // ]),
        // buttonBefore: React.PropTypes.node,
        // buttonAfter: React.PropTypes.node
    },

    getDefaultProps: function() {
        return {
            type: 'text'
            // addonBefore: null,
            // addonAfter: null,
            // buttonBefore: null,
            // buttonAfter: null
        };
    },

    changeValue: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
        this.setState({
            blurred: false
        });
    },

    setBlur: function () {
        this.setState({
            blurred: true
        });
    },

    render: function() {
        var element = this.renderElement();

        if (this.props.type === 'hidden') {
            return element;
        }

        // if (this.props.addonBefore || this.props.addonAfter || this.props.buttonBefore || this.props.buttonAfter) {
        //     element = this.renderInputGroup(element);
        // }

        if (this.getLayout() === 'elementOnly') {
            return element;
        }

        // var warningIcon = '';
        // if (this.showErrors()) {
        //     warningIcon = (<span>Error</span>);
        //     // warningIcon = (
        //     //     <Icon symbol="remove" className="form-control-feedback" />
        //     // );
        // }

        return (
            <Row {...this.getRowProperties()} htmlFor={this.getId()}>
                {element}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
        // {warningIcon}
        // {this.renderHelp()}
    },

    renderElement: function() {
        var inputClasses = ['input'].concat(this.props.className);

        if (this.showErrors()) {
            inputClasses.push('is-danger');
        }

        // if (['range'].indexOf(this.props.type) !== -1) {
        //     className = null;
        // }
        return (
            <input
                {...this.props}
                className={classNames(inputClasses)}
                id={this.getId()}
                value={this.getValue()}
                onChange={this.changeValue}
                onBlur={this.setBlur}
                disabled={this.isFormDisabled() || this.props.disabled}
            />
        );
    }

    // renderInputGroup: function(element) {
    //     return (
    //         <div className="input-group">
    //             {this.renderAddon(this.props.addonBefore)}
    //             {this.renderButton(this.props.buttonBefore)}
    //             {element}
    //             {this.renderAddon(this.props.addonAfter)}
    //             {this.renderButton(this.props.buttonAfter)}
    //         </div>
    //     );
    // },

    // renderAddon: function(addon) {
    //     if (!addon) {
    //         return false;
    //     }
    //     return (
    //         <span className="input-group-addon">{addon}</span>
    //     );
    // },

    // renderButton: function(button) {
    //     if (!button) {
    //         return false;
    //     }
    //     return (
    //         <span className="input-group-btn">{button}</span>
    //     );
    // }

});

module.exports = Input;
