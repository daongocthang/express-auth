export const str = {
    format: (s, args = []) => {
        let i = args.length;
        while (i--) {
            s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
        }
        return s;
    },
};
