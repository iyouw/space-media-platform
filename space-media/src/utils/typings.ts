export type Action<T> = (arg: T) => void;
export type Action2<T1, T2> = (arg1: T1, arg2: T2) => void;
export type Action3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => void;

export type Func<T, TReturn> = (arg: T) => TReturn;
export type Func2<T1, T2, TReturn> = (arg1: T1, arg2: T2) => TReturn;
export type Func3<T1, T2, T3, TReturn> = (arg1: T1, arg2: T2, arg3: T3) => TReturn;

export type Handler<T> = Action<T>;

export type Predicate<T> = Func<T, boolean>;
export type Equal<T> = Func2<T, T, boolean>;
export type Compare<T> = Func2<T, T, number>;

export type ByteArray = Uint8Array | Uint8ClampedArray;
export type ByteArrayLike = ByteArray | ArrayBuffer;
