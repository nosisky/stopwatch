import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import App from '../App';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<App />', () => {
  let timeText;
  let handleCountdownSpy;
  let wrapper;
  beforeEach(() => {
     wrapper = mount(<App />);
     handleCountdownSpy = jest.spyOn(wrapper.instance(), 'handleCountdown');
    wrapper.instance().startTimer();

    const input = wrapper.find('input')
    const submitButton = wrapper.find('form')
     timeText = wrapper.find('#timer')
    input.instance().value = 20;
    submitButton.simulate('submit');
  })
  it('renders without crashing', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('button').length).toBe(4);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('tests that that the timer starts successfully', () => {
    expect(timeText.text()).toBe('00:20');
    expect(handleCountdownSpy).toHaveBeenCalledWith(20)
    expect(wrapper.state().count).toBe(20)
  });

  it('tests that that the timer is paused successfully when pause button is clicked', () => {
    wrapper.instance().handlePause();
    expect(wrapper.state().isRunning).toBeFalsy()
  });

  it('tests that that the timer speed is increased when speed control button is clicked', () => {
    wrapper.instance().handleTimeSpeed(2);
    expect(wrapper.state().timerDelay).toBe(500)
  });
})
