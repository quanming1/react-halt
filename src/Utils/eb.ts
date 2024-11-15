type EventListener = (...args: any[]) => void;

class EventBus {
  private listeners: { [eventName: string]: EventListener[] } = {};

  /**
   * 注册事件监听器
   * @param eventName 事件名称
   * @param listener 监听器函数
   */
  on(eventName: string, listener: EventListener): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  /**
   * 注销事件监听器
   * @param eventName 事件名称
   * @param listener 要注销的监听器函数
   */
  off(eventName: string, listener: EventListener): void {
    if (!this.listeners[eventName]) {
      return;
    }
    const index = this.listeners[eventName].indexOf(listener);
    if (index > -1) {
      this.listeners[eventName].splice(index, 1);
    }
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给监听器的参数
   */
  emit(eventName: string, ...args: any[]): void {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach((listener) => {
        listener(...args);
      });
    }
  }
}

export const eventBus = new EventBus();
