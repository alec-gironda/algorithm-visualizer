import pygame
from collections import deque

screen_length = 810
screen_height = 810
#node class
class Node:
    '''
    attributes:

    neighbors (list of Node objects) :list of neighboring nodes
    
    isStart,isFinish (bool): if the node is the starting node or the finishing node
    
    red color, blue color, green color (int) : values of RGB for node
    
    isWall(bool): true if Node is wall

    x,y (float): top left corner coords of Node
    w,h (float): width, height of node in pixels
    
    rect(pygame.rect object): draw Node rectangle
    
    dist: distance to source node in search algorithm

    methods:

    __init__ : construct Node

    getters
    setters
    
    colliderect (see if a collision occurs with another node)

    # update: updates isSearched and isWall

    '''
    def __init__(self,x,y,w,h):
        self.x = x
        self.y = y
        self.w = w
        self.h = h
        self.isStart = False
        self.isFinish = False
        self.isWall = False
        self.red = 255
        self.green=255
        self.blue=255
        self.neighbors = []
        self.rect = pygame.Rect(self.x,self.y,self.w,self.h)
        self.dist = float('inf')
    #setter methods allow changes to attributes of a Node object
    def setStart(self, bool):
        self.isStart = bool
    def setFinish(self, bool):
        self.isFinish = bool
    def setWall(self, bool):
        self.isWall = bool
    def setRed(self, int):
        self.red = int
    def setGreen(self, int):
        self.green = int
    def setBlue(self, int):
        self.blue = int
    def setDist(self, int):
        self.dist = int
    def setNeighbor(self, neighbor):
        self.neighbors.append(neighbor)
    #getter methods allow easy calls to attributes of Node objects
    def getDist(self):
        return self.dist
    def getNeighbors(self):
        return self.neighbors
    def getWall(self):
        return self.isWall
    def getFinish(self):
        return self.isFinish
    def getStart(self):
        return self.isStart
        
class GridLine:
    '''
    gridlines for the maze
    '''
    def __init__(self,x,y,w,h):
        self.x = x
        self.y = y
        self.w = w
        self.h = h
        
        self.rect = pygame.Rect(self.x,self.y,self.w,self.h)
        
        

        
#loop to come back to on reset
resetLoop = True

while resetLoop:
        
    #init pygame and screen
    pygame.init()
    screen = pygame.display.set_mode((screen_length,screen_height))




    #init node width and height
    w_node  = 50
    h_node  = 50

    #init node placements
    gridLength = screen_length//w_node
    gridHeight = (screen_height-50)//h_node

    #init list of nodes
    nodes = []
    #init x and y coords
    x=0
    y=0

    #init nodes and add to nodes list
    for i in range(gridLength):
        x=(i*w_node)
        for j in range(gridHeight):
            y=(j*h_node)
            node = Node(x,y,w_node,h_node)
            nodes.append(node)
            
    #set neighbors
    for node in nodes:
        for other_node in nodes:
            if ((other_node.x == node.x+w_node and other_node.y == node.y) or (other_node.x == node.x-w_node and other_node.y == node.y) or (other_node.x == node.x and other_node.y == node.y-h_node) or (other_node.x == node.x and other_node.y == node.y+h_node)):
                node.setNeighbor(other_node)    

            
            
    #init list of gridlines
    gridLines = []
    #re initialize x and y because they were reassigned when node list was created
    x=0
    y=0

    #init gridLines

    #vertical gridlines
    for i in range(gridLength):
        x=(i*w_node)
        gridLine = GridLine(x,0,10,screen_length-60)
        gridLines.append(gridLine)
    #horizontal gridlines
    for i in range(gridHeight):
        y=(i*h_node)
        gridLine = GridLine(0,y,screen_height-10,10)
        gridLines.append(gridLine)
        
    #draw nodes in grid
    for node in nodes:
        pygame.draw.rect(screen,(node.red,node.green,node.blue),node.rect)


    #draw gridlines
    def drawGridLines():
        for gridLine in gridLines:
            pygame.draw.rect(screen,(0,0,0),gridLine.rect)

    #update the color of a node
    def newNodeColor(node,red,green,blue):
        node.setRed(red)
        node.setGreen(green)
        node.setBlue(blue)
        pygame.draw.rect(screen,(node.red,node.green,node.blue),node.rect)
        drawGridLines()
        pygame.display.update()

    #w pressed (generate wall)
    def pressed_w():
     
        for node in nodes:
            if (node.x <= mouse_x_coord <= node.x + w_node) and (node.y <= mouse_y_coord <= node.y + h_node):
                node.setRed(0)
                node.setGreen(0)
                node.setBlue(0)
                node.setWall(True)
                pygame.draw.rect(screen,(node.red,node.green,node.blue),node.rect)

    #s pressed (choose start)
    def pressed_s():
        for node in nodes:
            if (node.x <= mouse_x_coord <= node.x + w_node) and (node.y <= mouse_y_coord <= node.y + h_node):
                node.setRed(0)
                node.setGreen(255)
                node.setBlue(0)
                node.setStart(True)
                pygame.draw.rect(screen,(node.red,node.green,node.blue),node.rect)

    #f pressed (choose finish)
    def pressed_f():
        for node in nodes:
            if (node.x <= mouse_x_coord <= node.x + w_node) and (node.y <= mouse_y_coord <= node.y + h_node):
                node.setRed(255)
                node.setGreen(0)
                node.setBlue(0)
                node.setFinish(True)
                pygame.draw.rect(screen,(node.red,node.green,node.blue),node.rect)
            
    def pressed_m():
        for node in nodes:
            if (node.x <= mouse_x_coord <= node.x + w_node) and (node.y <= mouse_y_coord <= node.y + h_node):
                node.setRed(255)
                node.setGreen(255)
                node.setBlue(255)
                node.setWall(False)
                node.setStart(False)
                node.setFinish(False)
                pygame.draw.rect(screen,(node.red,node.green,node.blue),node.rect)

    def depthFirstSearch():
        stack = list([])
        searchNode = Node(0,0,0,0) #init searchNode
        for node in nodes:
            
            if node.getFinish() == True:
                finish = node

            if node.getStart() == True:
                start = node
                #set start dist to 0
                start.setDist(0)
                #push start node into stack
                stack.append(start)
        while stack: #not empty
            searchNode = stack.pop()
            if searchNode == finish:
                break
            for node in searchNode.getNeighbors():
                if node.getWall():
                    #don't search walls
                    continue
                if node.getDist()== float('inf'):   #if not searched yet
                    #update color to currently being searched dark blue
                    newNodeColor(node,0,0,255)
                    #update color to already searched blue after 50ms
                    pygame.time.wait(50)
                    newNodeColor(node,131,238,255)
                    node.setDist(searchNode.getDist()+1)
                    stack.append(node)
        #if finish couldn't be found
        if not searchNode == finish:
            print("couldn't reach finish!")
            return
        dist = 0 #counter for length of shortest distance
        smallestDist = float('inf'); #init smallest distance variable
        smallestDistNode = Node(0,0,0,0) #init smallestDistNode
        #turns finish orange
        newNodeColor(finish,255,165,0)
        while not finish==start:
            dist+=1
            for node in finish.getNeighbors():
                if node.getDist()<smallestDist:
                    smallestDist = node.getDist()
                    finish = node
            #makes quickest path orange
            newNodeColor(finish,255,165,0)
            #keeps start green
            newNodeColor(start,0,255,0)
        print("distance from start: "+ str(dist))

    def breadthFirstSearch():
        queue = deque([])
        searchNode = Node(0,0,0,0) #init searchNode
        for node in nodes:
       
            if node.getFinish() == True:
                finish = node

            if node.getStart() == True:
                #put start node into queue
                start = node
                #set start dist to 0
                start.setDist(0)
                queue.append(start)
        while queue: #not empty
            searchNode = queue.popleft()
            if searchNode == finish:
                break
            for node in searchNode.getNeighbors():
                if node.getWall():
                    continue
                if node.getDist()== float('inf'):
                    #update color to currently being searched dark blue
                    newNodeColor(node,0,0,255)
                    #update color to already searched blue after 100ms
                    pygame.time.wait(50)
                    newNodeColor(node,131,238,255)
                    node.setDist(searchNode.getDist()+1)
                    queue.append(node)
        #if finish couldn't be found
        if not searchNode == finish:
            print("couldn't reach finish!")
            return
        dist = 0 #counter for length of shortest distance
        smallestDist = float('inf'); #init smallest distance variable
        smallestDistNode = Node(0,0,0,0) #init smallestDistNode
        #turns finish oragne
        newNodeColor(finish,255,165,0)
        while not finish==start:
            dist+=1
            for node in finish.getNeighbors():
                if node.getDist()<smallestDist:
                    smallestDist = node.getDist()
                    finish = node
            #makes quickest path orange
            newNodeColor(finish,255,165,0)
            #keeps start green
            newNodeColor(start,0,255,0)
        print("distance from start: "+str(dist))
        
    #sets text instructions at bottom of game
    def setText():
        pygame.font.init()
        font = pygame.font.SysFont('Times New Roman',25)
        text = font.render("q: quit   s: set start     f: set finish    w: set wall   m: delete   b: bfs     d: dfs ",False,(255,255,255))
        screen.blit(text,(10, 0.95*screen_height))

    def setStartScreenText():
        pygame.font.init()
        font = pygame.font.SysFont('Times New Roman',25)
        startText = font.render("Press Space to Start!",False,(255,255,255))
        screen.blit(startText,(screen_length//2.9, screen_height//2))
        quitText = font.render("or press q to quit",False,(255,255,255))
        screen.blit(quitText,(screen_length//2.8, screen_height*.8))



            
    createWall = False #initialize a variable used to see whether or not user is creating walls (really used for keyholds)

    loop = True


    #initialize black start screen
    start_screen = pygame.Rect(0,0,screen_length-10,screen_height)
    #white screen to wipe black start screen
    wipe_start_screen = pygame.Rect(0,0,screen_length-10,screen_height-60)
    showStartScreen = True

    #game loop
    while loop:
        
        #wont reset unless user presses r
        resetLoop = False
                
        if showStartScreen == True:
            
            event = pygame.event.poll()
            
            #start screen background
            pygame.draw.rect(screen,(0,0,0),start_screen)
            setStartScreenText()
            
            if event.type == pygame.KEYDOWN:
                
                 #if q pressed, quit game
                if event.key == pygame.K_q:
                    print('quit the game!')
                    loop = False
                
                #space gets rid of start screen and allows keys to be held
                if event.key == pygame.K_SPACE:
                    pygame.draw.rect(screen,(255,255,255),wipe_start_screen)
                    pygame.key.set_repeat(10)
                    createWall = True
                    showStartScreen = False
        else:
            #see where mouse is hovering
            mouse_x_coord = pygame.mouse.get_pos()[0]
            mouse_y_coord = pygame.mouse.get_pos()[1]
            
            #make mouse visible to user
            pygame.mouse.set_visible
            
            event = pygame.event.poll()
            
            #if not creating walls, we don't want to be able to drag to 'paint' nodes
            if createWall == False:
                pygame.key.set_repeat()
                            
            if event.type == pygame.KEYDOWN:
                
                createWall = False

                #if q pressed, quit game
                if event.key == pygame.K_q:
                    print('quit the game!')
                    loop = False
                
                #if r pressed, reset game
                if event.key == pygame.K_r:
                    print('reset game')
                    resetLoop=True
                    loop = False
                    
                #if space pressed, allow for wall dragging
                if event.key == pygame.K_SPACE:
                    pygame.key.set_repeat(10)
                    createWall = True
                
                #if w pressed set walls
                if event.key == pygame.K_w:
                    createWall = True
                    pressed_w()
                #if s pressed set start
                if event.key == pygame.K_s:
                    pressed_s()
                #if f pressed set finish
                if event.key == pygame.K_f:
                    pressed_f()
                #if m pressed, reset node
                if event.key == pygame.K_m:
                    pressed_m()                        
                #d to dfs
                if event.key == pygame.K_d:
                    depthFirstSearch()
                #b to bfs
                if event.key == pygame.K_b:
                    breadthFirstSearch()
                    
            #draw grid lines... keeping this in game loop so that node colors stay within the grid lines
            drawGridLines()
            
            setText()

        #update display
        pygame.display.update()

    pygame.quit()
    
#add weights
#implement dijkstras

