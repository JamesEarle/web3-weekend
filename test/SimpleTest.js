/* Truffle gives us certain objects that are "undefined" to eslint */
/* eslint-disable no-undef */

const Simple = artifacts.require('Simple');

contract('Simple', () => {
    let _simple;

    before(async () => {
        _simple = await Simple.deployed();
    })

    describe('User has a name', async () => {
        it('has a name', async () => {
            const name = await _simple.name();
            assert.equal(name, "ETHGlobal");
        });
        it('sets a name', async () => {
            await _simple.setName("Jim");
            const name = await _simple.name();
            assert.equal(name, "Jim");
        });
    });
})