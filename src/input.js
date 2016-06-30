/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var classNames = require('classnames');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Input = React.createClass({

    displayName: 'Input',

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
        ])
    },

    getDefaultProps: function() {
        return {
            type: 'text'
        };
    },

    changeValue: function(event) {
        var value = event.target.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
        this.setState({
            blurred: false
        });
    },

    setBlur: function (evt) {
        if (this.props.onBlur) {
            this.props.onBlur(this.props.name, evt.target.value);
        }
        this.setState({
            blurred: true
        });
    },

    renderLabel: function () {
        if (this.props.label) {
            return (<label className="label" htmlFor={this.getId()}>{this.props.label}</label>);
        }
    },

    render: function() {
        var element = this.renderElement();

        if (this.props.type === 'hidden') {
            return element;
        }

        if (this.props.elementOnly) {
            return (
                <div className="input-standalone">
                    {element}
                    {this.renderErrorMessage()}
                </div>
            );
        }

        if (this.props.isGrouped) {
            return (
                <div className="input-group">
                    {this.renderLabel()}
                    {element}
                </div>);
        }

        return (
            <Row {...this.getRowProperties()} htmlFor={this.getId()}>
                {element}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    },

    renderElement: function() {
        var inputClasses = ['input'].concat(this.props.className);

        if (this.showErrors()) {
            inputClasses.push('is-danger');
        }

        return (
            <input
                {...this.props}
                className={classNames(inputClasses)}
                id={this.getId()}
                value={this.getValue()}
                onChange={this.changeValue}
                onBlur={this.setBlur}
                aria-label={this.props.elementOnly ? this.props.label : undefined}
                title={this.props.title || this.props.label}
                disabled={this.isFormDisabled() || this.props.disabled}
            />
        );
    }

});

module.exports = Input;
