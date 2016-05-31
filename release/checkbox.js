/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Checkbox = React.createClass({
    displayName: 'Checkbox',


    mixins: [Formsy.Mixin, ComponentMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            label: '',
            rowLabel: '',
            value: false
        };
    },

    changeValue: function changeValue(event) {
        var target = event.currentTarget;
        this.setValue(target.checked);
        this.props.onChange(this.props.name, target.checked);
    },

    renderElement: function renderElement() {
        return React.createElement(
            'label',
            { className: 'checkbox' },
            React.createElement('input', _extends({}, this.props, {
                id: this.getId(),
                type: 'checkbox',
                'aria-label': this.props.elementOnly ? this.props.label : undefined,
                title: this.props.title || this.props.label,
                checked: this.getValue() === true,
                onChange: this.changeValue,
                disabled: this.isFormDisabled() || this.props.disabled
            })),
            ' ',
            this.props.label
        );
    },

    render: function render() {

        var element = this.renderElement();

        if (this.props.elementOnly) {
            return element;
        }

        return React.createElement(
            Row,
            _extends({}, this.getRowProperties(), {
                label: this.props.rowLabel,
                htmlFor: this.getId()
            }),
            element,
            this.renderHelp(),
            this.renderErrorMessage()
        );
    }
});

module.exports = Checkbox;