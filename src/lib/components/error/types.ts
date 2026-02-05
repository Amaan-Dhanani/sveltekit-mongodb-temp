import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue } from 'clsx';

export type tErrorProps = HTMLAttributes<HTMLDivElement> & {
    error?: any;
    big?: boolean;
    onclick?: any;
    btnText?: string;
    divClass?: ClassValue;
};
