package main

import (
	"log"
	"net/http"
	"os/exec"
	"runtime"
)

func main() {
	// 设置静态文件目录
	fs := http.FileServer(http.Dir("./res"))
	http.Handle("/", fs)

	// 启动服务器
	go func() {
		log.Println("应用程序已启动，请访问 http://localhost:4000")
		err := http.ListenAndServe(":4000", nil)
		if err != nil {
			log.Fatal(err)
		}
	}()

	// 打开默认浏览器并访问本地应用
	err := openBrowser("http://localhost:4000")
	if err != nil {
		log.Fatal(err)
	}

	// 防止主 goroutine 退出
	select {}
}

// openBrowser 打开默认浏览器
func openBrowser(url string) error {
	var err error

	switch {
	case isWindows():
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case isMac():
		err = exec.Command("open", url).Start()
	case isLinux():
		err = exec.Command("xdg-open", url).Start()
	default:
		err = exec.Command("xdg-open", url).Start()
	}

	return err
}

// 判断是否为 Windows 系统
func isWindows() bool {
	return runtime.GOOS == "windows"
}

// 判断是否为 Mac 系统
func isMac() bool {
	return runtime.GOOS == "darwin"
}

// 判断是否为 Linux 系统
func isLinux() bool {
	return runtime.GOOS == "linux"
}
