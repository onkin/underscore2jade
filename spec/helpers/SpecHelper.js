beforeEach(() => {
    jasmine.addMatchers({
        toBeSameTemplate: () => {
            return {
                compare: (actual, expected) => {
                    return {
                        pass: actual && actual.trim() === expected
                    };
                }
            };
        }
    });
});
