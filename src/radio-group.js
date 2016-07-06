/*jshint node:true */

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var RadioGroup = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(['inline', 'stacked']),
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function() {
        return {
            type: 'stacked',
            label: '',
            help: null
        };
    },

    changeRadio: function(event) {
        var value = event.target.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function() {
        var _this = this;
        var id = this.getId();
        var controls = this.props.options.map(function(radio, key) {
            var checked = (_this.getValue() === radio.value);
            var disabled = _this.isFormDisabled() || radio.disabled || _this.props.disabled;
            return (
                <label className="radio" key={id + '-' + key}>
                    <input
                        className={ disabled ? 'is-disabled' : '' }
                        checked={checked}
                        type="radio"
                        value={radio.value}
                        onChange={_this.changeRadio}
                        disabled={disabled}
                      /> {radio.label}
                </label>
            );
        });
        return controls;
    },

    render: function() {

        if (this.props.elementOnly) {
            return (
                <div>{this.renderElement()}</div>
            );
        }

        return (
            <Row
                {...this.getRowProperties()}
            >
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = RadioGroup;
