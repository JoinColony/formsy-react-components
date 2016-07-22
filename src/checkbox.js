/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var propUtilities = require('./prop-utilities');

var Checkbox = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    getDefaultProps: function() {
        return {
            label: '',
            rowLabel: '',
            value: false
        };
    },

    changeValue: function(event) {
        var target = event.target;
        this.setValue(target.checked);
        this.props.onChange(this.props.name, target.checked);
    },

    renderElement: function() {
        return (
            <label className="checkbox">
                <input
                    {...propUtilities.cleanProps(this.props)}
                    id={this.getId()}
                    type="checkbox"
                    aria-label={this.props.elementOnly ? this.props.label : undefined}
                    title={this.props.title || this.props.label}
                    checked={this.getValue() === true}
                    onChange={this.changeValue}
                    disabled={this.isFormDisabled() || this.props.disabled}
                /> {this.props.label}
            </label>
        );
    },

    render: function() {

        var element = this.renderElement();

        if (this.props.elementOnly) {
            return element;
        }

        return (
            <Row
                {...this.getRowProperties()}
                label={this.props.rowLabel}
                htmlFor={this.getId()}
            >
                {element}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = Checkbox;
