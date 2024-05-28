
export const Mapper = <T>(dto: T, body: any): T => {
    if (!dto) {
        throw new Error('responseDTO cannot be null or undefined');
    }

    const mappedDTO: Partial<T> = {};

    Object.keys(dto).forEach(key => {
        const targetKey = body && body[key];
        if (targetKey && typeof targetKey == typeof (dto as any)[key]) {
            (mappedDTO as any)[key] = targetKey
        }
    });

    return mappedDTO as T;
};

