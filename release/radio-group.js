'use strict';

/*jshint node:true */

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var RadioGroup = React.createClass({
    displayName: 'RadioGroup',


    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(['inline', 'stacked']),
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'stacked',
            label: '',
            help: null
        };
    },

    changeRadio: function changeRadio(event) {
        var value = event.target.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function renderElement() {
        var _this = this;
        var id = this.getId();
        var controls = this.props.options.map(function (radio, key) {
            var checked = _this.getValue() === radio.value;
            var disabled = _this.isFormDisabled() || radio.disabled || _this.props.disabled;
            return React.createElement(
                'label',
                { className: 'radio', key: id + '-' + key },
                React.createElement('input', {
                    className: disabled ? 'is-disabled' : '',
                    checked: checked,
                    type: 'radio',
                    value: radio.value,
                    onChange: _this.changeRadio,
                    disabled: disabled
                }),
                ' ',
                radio.label
            );
        });
        return controls;
    },

    render: function render() {

        if (this.props.elementOnly) {
            return React.createElement(
                'div',
                null,
                this.renderElement()
            );
        }

        return React.createElement(
            Row,
            this.getRowProperties(),
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );
    }
});

module.exports = RadioGroup;