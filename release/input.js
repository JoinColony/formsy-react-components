/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var classNames = require('classnames');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Input = React.createClass({

    displayName: 'Input',

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        type: React.PropTypes.oneOf(['color', 'date', 'datetime', 'datetime-local', 'email', 'hidden', 'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'time', 'url', 'week'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text'
        };
    },

    changeValue: function changeValue(event) {
        var value = event.target.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
        this.setState({
            blurred: false
        });
    },

    setBlur: function setBlur(evt) {
        if (this.props.onBlur) {
            this.props.onBlur(this.props.name, evt.target.value);
        }
        this.setState({
            blurred: true
        });
    },

    renderLabel: function renderLabel() {
        if (this.props.label) {
            return React.createElement(
                'label',
                { className: 'label', htmlFor: this.getId() },
                this.props.label
            );
        }
    },

    render: function render() {
        var element = this.renderElement();

        if (this.props.type === 'hidden') {
            return element;
        }

        if (this.props.elementOnly) {
            return React.createElement(
                'div',
                { className: 'input-standalone' },
                element,
                this.renderErrorMessage()
            );
        }

        if (this.props.isGrouped) {
            return React.createElement(
                'div',
                { className: 'input-group' },
                this.renderLabel(),
                element
            );
        }

        return React.createElement(
            Row,
            _extends({}, this.getRowProperties(), { htmlFor: this.getId() }),
            element,
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
        var inputClasses = ['input'].concat(this.props.className);

        if (this.showErrors()) {
            inputClasses.push('is-danger');
        }

        return React.createElement('input', _extends({}, this.props, {
            className: classNames(inputClasses),
            id: this.getId(),
            value: this.getValue() || '',
            onChange: this.changeValue,
            onBlur: this.setBlur,
            'aria-label': this.props.elementOnly ? this.props.label : undefined,
            title: this.props.title || this.props.label,
            disabled: this.isFormDisabled() || this.props.disabled
        }));
    }

});

module.exports = Input;