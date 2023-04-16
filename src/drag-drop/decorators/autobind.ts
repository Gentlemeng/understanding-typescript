namespace App {
    export function autobind(
        target: any,
        name: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const originalMethod = descriptor.value;
        return {
            configurable: true,
            enumerable: false,
            get() {
                return originalMethod.bind(this);
            },
        };
    }
}