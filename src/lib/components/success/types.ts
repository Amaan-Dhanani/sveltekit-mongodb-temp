import type { HTMLAttributes } from 'svelte/elements';
import type { ClassValue } from 'clsx';

export type tSuccessProps = HTMLAttributes<HTMLDivElement> & {
    success?: any;
    big?: boolean;
    onclick?: any;
    btnText?: string;
    duration?: number;
    divClass?: ClassValue;
};
