/* global describe, it, React */

import expect from 'expect';
import { mount } from 'enzyme';
import Button from './button';

function defaultProps(props={}) {
	return Object.assign({}, {
		text: 'Press me!'
	}, props);
}

describe('Button', () => {
	it('should fire `onClick` function when element is clicked', () => {
		const onClick = expect.createSpy();
		const props = defaultProps({ onClick });
		const button = mount(<Button {...props}/>);
		button.find('div').simulate('click');
		expect(onClick).toHaveBeenCalled();
	});
});
