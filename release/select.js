/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');

var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Select = React.createClass({
    displayName: 'Select',


    mixins: [Formsy.Mixin, ComponentMixin],

    changeValue: function changeValue(event) {
        var target = event.target;
        var value;
        if (this.props.multiple) {
            value = [];
            for (var i = 0; i < target.length; i++) {
                var option = target.options[i];
                if (option.selected) {
                    value.push(option.value);
                }
            }
        } else {
            value = target.value;
        }
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    render: function render() {

        if (this.props.elementOnly) {
            return React.createElement(
                'div',
                { className: 'input-standalone' },
                this.renderElement(),
                this.renderErrorMessage()
            );
        }

        return React.createElement(
            Row,
            _extends({}, this.getRowProperties(), {
                htmlFor: this.getId()
            }),
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
        var optionNodes = this.props.options.map(function (item, index) {
            return React.createElement(
                'option',
                _extends({ key: index }, item, { label: null }),
                item.label
            );
        });

        return React.createElement(
            'span',
            { className: this.getClassNames('select') },
            React.createElement(
                'select',
                _extends({}, this.props, {
                    id: this.getId(),
                    value: this.getValue() || '',
                    onChange: this.changeValue,
                    'aria-label': this.props.elementOnly ? this.props.label : undefined,
                    title: this.props.title || this.props.label,
                    disabled: this.isFormDisabled() || this.props.disabled
                }),
                optionNodes
            )
        );
    }
});

module.exports = Select;