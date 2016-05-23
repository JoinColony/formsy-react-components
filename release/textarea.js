/*jshint node:true */

'use strict';

// var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var classNames = require('classnames');

var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Textarea = React.createClass({
    displayName: 'Textarea',

    mixins: [Formsy.Mixin, ComponentMixin],

    // propTypes: {
    //     rows: React.PropTypes.number,
    //     cols: React.PropTypes.number
    // },

    // getDefaultProps: function getDefaultProps() {
    //     return {
    //         rows: 3,
    //         cols: 0 // React doesn't render the cols attribute if it is zero
    //     };
    // },

    changeValue: function changeValue(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
        this.setState({
            blurred: false
        });
    },

    setBlur: function setBlur(evt) {
        if (this.props.onBlur) {
            this.props.onBlur(this.props.name, evt.currentTarget.value);
        }
        this.setState({
            blurred: true
        });
    },

    renderElement: function renderElement() {

        var textareaClasses = ['textarea'].concat(this.props.className);

        if (this.showErrors()) {
            textareaClasses.push('is-danger');
        }

        return React.createElement('textarea', _extends({}, this.props, {
            className: classNames(textareaClasses),
            id: this.getId(),
            value: this.getValue(),
            onChange: this.changeValue,
            onBlur: this.setBlur,
            'aria-label': this.props.elementOnly ? this.props.label : undefined,
            title: this.props.title || this.props.label,
            disabled: this.isFormDisabled() || this.props.disabled
        }));
        // return React.createElement('textarea', _extends({
        //     className: 'form-control'
        // }, this.props, {
        //     id: this.getId(),
        //     value: this.getValue(),
        //     onChange: this.changeValue,
        //     disabled: this.isFormDisabled() || this.props.disabled
        // }));
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
            _extends({}, this.getRowProperties(), { htmlFor: this.getId() }),
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );

        // if (this.getLayout() === 'elementOnly') {
        //     return this.renderElement();
        // }

        // return React.createElement(
        //     Row,
        //     _extends({}, this.getRowProperties(), {
        //         htmlFor: this.getId()
        //     }),
        //     this.renderElement(),
        //     this.renderHelp(),
        //     this.renderErrorMessage()
        // );
    }
});

module.exports = Textarea;