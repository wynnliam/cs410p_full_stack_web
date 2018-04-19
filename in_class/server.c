#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main() {
	int server = socket(AF_INET, SOCK_STREAM, 0);

	if(server < 0)
		return 0;

	struct sockaddr_in addr_server;
	addr_server.sin_family = AF_INET;
	addr_server.sin_addr.s_addr = INADDR_ANY;
	addr_server.sin_port = htons(8080);

	if(bind(server, (struct sockaddr*)&addr_server, sizeof(addr_server)) != 0)
		return 0;

	if(listen(server, 1000) != 0)
		return 0;

	struct sockaddr_storage addr_client;
	socklen_t len_client;
	int client;
	char crecv[1024];
	char csend[1024];
	int irecv;
	int isend;

	do {
		len_client = sizeof(addr_client);
		client = accept(server, (struct sockaddr*)(&addr_client), &len_client);

		if(client < 0)
			return 0;

		irecv = recv(client, crecv, 1024, 0);

		strcat(csend, "HTTP/1.1 200 OK\r\n");
		strcat(csend, "Content-Type: text/plain\r\n");
		strcat(csend, "Content-Length: 12\r\n");
		strcat(csend, "Connection: close\r\n");
		strcat(csend, "\r\n");
		strcat(csend, "hello\nworld\n");

		isend = send(client, csend, strlen(csend), 0);

		close(client);
	} while(1);

	return 0;
}
