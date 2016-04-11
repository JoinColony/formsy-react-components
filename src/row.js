/*jshint node:true */

'use strict';

var React = require('react');
var classNames = require('classnames');

var Row = React.createClass({

    propTypes: {
        label: React.PropTypes.node,
        className: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        labelClassName: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        renderErrorMessages: React.PropTypes.bool,
        required: React.PropTypes.bool,
        hasErrors: React.PropTypes.bool,
        htmlFor: React.PropTypes.string,
        isLoading: React.PropTypes.bool,
        icon: React.PropTypes.string
    },

    getDefaultProps: function() {
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

    getInitialState: function () {
        return {
            errors: {}
        }
    },

    renderLabel: function() {

        if (!this.props.label) {
            return;
        }

        const labelClassNames = [];
        labelClassNames.push('label');
        labelClassNames.push(this.props.labelClassName);

        return (
            <label className={classNames(labelClassNames)} htmlFor={this.props.htmlFor}>
                {this.props.label}
            </label>
        );

    },

    addGroupErrors: function (id, errs) {
        const errors = this.state.errors;
        errors[id] = errs || [];
        this.setState({
            errors: errors
        });
    },

    renderGroupErrorMessages: function() {
        if (this.props.renderErrorMessages === false) {
            return;
        }
        const errors = this.state.errors;
        let groupErrors = [];
        Object.keys(this.state.errors).forEach(id => {
            groupErrors = groupErrors.concat(errors[id]);
        });
        return groupErrors.map((message, key) => {
            return (
                <span key={key} className="help is-danger">{message}</span>
            );
        });
    },

    render: function() {

        let rowClassNames = [{
            control: true,
            'is-grouped': !!this.props.isGroup,
            'is-loading': !!this.props.isLoading,
            'has-icon': !!this.props.icon,
            'has-icon-right': !!this.props.icon
        }];

        rowClassNames.push(this.props.rowClassName);

        if (this.props.isGroup) {

            const groupProps = {
                isGrouped: true,
                addGroupErrors: this.addGroupErrors
            };

            const childrenWithProps = React.Children
                .map(this.props.children, child => {
                    if (typeof child.type === 'function') {
                        return React.cloneElement(child, groupProps);
                    } else {
                        return child;
                    }
                });

            return (
                <div className={classNames(rowClassNames)}>
                    {childrenWithProps}
                    {this.renderGroupErrorMessages()}
                </div>
            );
        }

        return (
            <div className="control">
                {this.renderLabel()}
                <p className={classNames(rowClassNames)}>
                    {this.props.children}
                </p>
            </div>
        );
    }

});

module.exports = Row;
