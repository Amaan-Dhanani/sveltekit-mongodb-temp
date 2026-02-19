
import { z } from "zod";

const passwordRequirements = z.string().superRefine((val, ctx) => {
    const issues: string[] = [];
    if (val.length < 8) issues.push("at least 8 characters");
    if (!/[A-Z]/.test(val)) issues.push("an uppercase letter");
    if (!/[a-z]/.test(val)) issues.push("a lowercase letter");
    if (!/\d/.test(val)) issues.push("a number");
    if (!/[\W_]/.test(val)) issues.push("a fancy special character");
    if (issues.length > 0) {
        const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
        ctx.addIssue({
            code: "custom", // Use a simple string instead of the deprecated enum
            message: `Your password needs ${formatter.format(issues)}.`
        });
    }
});

export const registerSchema = z.object({
    type: z.string().min(1, 'Please select an option from the dropdown.'),
    email: z.email('Please enter a valid email.'),
    password: passwordRequirements
});

export const loginSchema = z.object({
    email: z.email('Please enter a valid email.'),
    password: z.string().min(1, "Password is required.")
});

export const modifyDeleteSchema = z.object({
    email: z.email('Please enter a valid email.'),
    newEmail: z.email().optional(),
    type: z.string().min(1, 'Please select an option from the dropdown.'),
    password: passwordRequirements
});