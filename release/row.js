'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*jshint node:true */

var React = require('react');
var classNames = require('classnames');

var Row = React.createClass({
    displayName: 'Row',


    propTypes: {
        label: React.PropTypes.node,
        className: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]),
        labelClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]),
        renderErrorMessages: React.PropTypes.bool,
        required: React.PropTypes.bool,
        hasErrors: React.PropTypes.bool,
        htmlFor: React.PropTypes.string,
        isLoading: React.PropTypes.bool,
        icon: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            label: '',
            className: '',
            labelClassName: '',
            elementWrapperClassName: '',
            icon: '',
            required: false,
            hasErrors: false
        };
    },

    getInitialState: function getInitialState() {
        return {
            errors: {}
        };
    },

    renderLabel: function renderLabel() {

        if (!this.props.label) {
            return;
        }

        var labelClassNames = [];
        labelClassNames.push('label');
        labelClassNames.push(this.props.labelClassName);

        return React.createElement(
            'label',
            { className: classNames(labelClassNames), htmlFor: this.props.htmlFor },
            this.props.label
        );
    },

    addGroupErrors: function addGroupErrors(id, errs) {
        var errors = this.state.errors;
        errors[id] = errs || [];
        this.setState({
            errors: errors
        });
    },

    renderGroupErrorMessages: function renderGroupErrorMessages() {
        if (this.props.renderErrorMessages === false) {
            return;
        }
        var errors = this.state.errors;
        var groupErrors = [];
        Object.keys(this.state.errors).forEach(function (id) {
            groupErrors = groupErrors.concat(errors[id]);
        });
        return groupErrors.map(function (message, key) {
            return React.createElement(
                'span',
                { key: key, className: 'help is-danger' },
                message
            );
        });
    },

    render: function render() {
        var _this = this;

        var rowClassNames = [{
            control: true,
            'is-grouped': !!this.props.isGroup,
            'is-loading': !!this.props.isLoading,
            'has-icon': !!this.props.icon,
            'has-icon-right': !!this.props.icon
        }];

        rowClassNames.push(this.props.rowClassName);

        if (this.props.isGroup) {
            var _ret = function () {

                var groupProps = {
                    isGrouped: true,
                    addGroupErrors: _this.addGroupErrors
                };

                var childrenWithProps = React.Children.map(_this.props.children, function (child) {
                    if (typeof child.type === 'function') {
                        return React.cloneElement(child, groupProps);
                    } else {
                        return child;
                    }
                });

                return {
                    v: React.createElement(
                        'div',
                        { className: classNames(rowClassNames) },
                        childrenWithProps,
                        _this.renderGroupErrorMessages()
                    )
                };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }

        return React.createElement(
            'div',
            { className: 'control' },
            this.renderLabel(),
            React.createElement(
                'p',
                { className: classNames(rowClassNames) },
                this.props.children
            )
        );
    }

});

module.exports = Row;