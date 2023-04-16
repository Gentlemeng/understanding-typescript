namespace App {
    export enum ProjectStatus {
        Active = "active",
        Finished = "finished",
    }

    export type listener<T> = (items: T[]) => void;
}
