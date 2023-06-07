import threading
import queue
import random
import time

# 创建一个长度为10的队列
q = queue.Queue(maxsize=10)


# 定义写入队列的函数
def writer():
    while True:
        # mock数据，随机生成数组长度和每个元素的值
        data_len = random.randint(1, 10)
        data = [random.randint(0, 255) for _ in range(data_len)]

        q.put(data)
        print(f"Writer put data: {data}")


# 定义从队列中读取数据的函数
def reader():
    while True:
        data = q.get()
        print(f"Reader get data: {data}")


if __name__ == "__main__":

    # 创建两个线程分别执行writer和reader函数
    t1 = threading.Thread(target=writer)
    t2 = threading.Thread(target=reader)

    # 启动线程
    t1.start()
    t2.start()

    # 等待两个线程结束
    t1.join()
    t2.join()
