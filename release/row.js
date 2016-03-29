/*jshint node:true */

'use strict';

var React = require('react');
var classNames = require('classnames');

var Row = React.createClass({
    displayName: 'Row',


    propTypes: {
        label: React.PropTypes.node,
        className: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]),
        labelClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]),
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

    renderLabel: function renderLabel() {

        if (this.props.layout === 'elementOnly' || !this.props.label) {
            return;
        }

        var labelClassNames = [];
        labelClassNames.push('label');

        // if (this.props.layout === 'horizontal') {
        //     labelClassNames.push('col-sm-3');
        // }

        labelClassNames.push(this.props.labelClassName);

        // if (this.props.fakeLabel) {
        //     return (
        //         <div className={classNames(labelClassNames)}>
        //             <strong>
        //                 {this.props.label}
        //                 // {this.props.required ? ' *' : null}
        //             </strong>
        //         </div>
        //     );
        // }
        return React.createElement(
            'label',
            { className: classNames(labelClassNames), htmlFor: this.props.htmlFor },
            this.props.label
        );
    },

    render: function render() {

        if (this.props.layout === 'elementOnly') {
            return React.createElement(
                'span',
                null,
                this.props.children
            );
        }

        var rowClassNames = [{
            control: true,
            'is-loading': !!this.props.isLoading,
            'has-icon': !!this.props.icon,
            'has-icon-right': !!this.props.icon
        }];

        rowClassNames.push(this.props.rowClassName);

        return React.createElement(
            'div',
            { className: 'control control--group' },
            this.renderLabel(),
            React.createElement(
                'p',
                { className: classNames(rowClassNames) },
                this.props.children
            )
        );

        // var cssClasses = {
        //     row: ['form-group'],
        //     elementWrapper: []
        // };

        // if (this.props.hasErrors) {
        //     cssClasses.row.push('has-error');
        //     cssClasses.row.push('has-feedback');
        // }

        // var element = this.props.children;
        // if (this.props.layout === 'horizontal') {

        //     // Horizontal layout needs a 'row' class for Bootstrap 4
        //     cssClasses.row.push('row');

        //     cssClasses.elementWrapper.push('col-sm-9');
        //     cssClasses.elementWrapper.push(this.props.elementWrapperClassName);

        //     element = (
        //         <div className={classNames(cssClasses.elementWrapper)}>
        //             {this.props.children}
        //         </div>
        //     );
        // }

        // cssClasses.row.push(this.props.className);
        // return (
        //     <div className={classNames(cssClasses.row)}>
        //         {this.renderLabel()}
        //         {element}
        //     </div>
        // );
    }

});

module.exports = Row;