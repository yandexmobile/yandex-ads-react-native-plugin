class Logger {
    public addLog(log: string, setLogs: React.Dispatch<React.SetStateAction<string[]>>): void {
        const newLog = `${this.getCurrentTime()}: ${log}`;
        setLogs((prevLogs) => [...prevLogs, newLog]);
    }

    private getCurrentTime(): string {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }
}

export default Logger;
