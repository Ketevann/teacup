import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

import {Logout} from './Logout'

/* global describe it beforeEach */
describe('<Logout />', () => {
  let root
  beforeEach('render the root', () =>
    root = shallow(<Logout/>)
  )

  it('has a logout button', () => {
    const submit = root.find('input[type="submit"]')
    expect(submit).to.have.length(1)
  })

  describe('when submitted', () => {
    const logout = spy()
    const root = shallow(<Logout logout={logout}/>)
    const submitEvent = {
      preventDefault: spy(),
      target: {
        username: {value: 'bones@example.com'},
        password: {value: '12345'},
      }
    }

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called
    })
  })
})
