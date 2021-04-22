export default function (): {
    name: string;
    transform(source: string, id: string): string;
};
