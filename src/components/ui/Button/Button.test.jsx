import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

let clickTestValue = 0;
const inCreaseValueCount = () => {
    clickTestValue += 1;
};

test('UI/Button', () => {
    const wrapper = shallow(
        <Button theme="blue" onClick={inCreaseValueCount}>
            Hello
        </Button>
    );
    wrapper.simulate('click');

    expect(wrapper.text()).toEqual('Hello');
    expect(clickTestValue).toEqual(1);

    expect(wrapper).toMatchSnapshot();
});
