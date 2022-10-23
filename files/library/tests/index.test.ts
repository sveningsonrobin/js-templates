import { foo } from '~/index';

describe('[foo]', () => {
    it('Works as it should', () => {
        expect(foo()).toBe('bar');
    });
});
