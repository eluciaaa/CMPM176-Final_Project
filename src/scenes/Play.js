class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
        // load assets
        this.load.path = './assets/'
        this.load.image('background', 'background.jpg')
        this.load.image('postitnote', '250x250postitnote.png')
        this.load.image('day', '150x150day.png')
        this.load.image('night', '150x150night.png')
        this.load.image('comforteat', 'comforteat.png')
        this.load.image('study', 'study.png')
        this.load.image('workout', 'workout.png')
        this.load.image('bedrot', 'bedrot.png')
        this.load.image('studyfailure', 'studyfailure.png')
        this.load.image('smallinjury', 'smallinjury.png')
        this.load.image('biginjury', 'biginjury.png')
        this.load.image('bingeeat', 'bingeeat.png')
        this.load.image('doomscroll', 'doomscroll.png')
        this.load.image('laundry', 'laundry.png')
        this.load.image('gethomeandcrash', 'gethomeandcrash.png')
        
        // load spritesheets
        this.load.spritesheet('mentalhealth', '250x50mentalhealthbar.png', {
            frameWidth: 250,
            frameHeight: 50,
        })
        this.load.spritesheet('physicalhealth', '250x50physicalhealthbar.png', {
            frameWidth: 250,
            frameHeight: 50,
        })
        this.load.spritesheet('exampreparedness', '250x50prepbar.png', {
            frameWidth: 250,
            frameHeight: 50,
        })
        this.load.spritesheet('button1', '200x100button1.png', {
            frameWidth: 200,
            frameHeight: 100,
        })
        this.load.spritesheet('button2', '200x100button2.png', {
            frameWidth: 200,
            frameHeight: 100,
        })
        this.load.spritesheet('button3', '200x100button3.png', {
            frameWidth: 200,
            frameHeight: 100,
        })
        this.load.spritesheet('button4', '200x100button4.png', {
            frameWidth: 200,
            frameHeight: 100,
        })
        this.load.spritesheet('daytonight', '150x150daytonightspritesheet.png', {
            frameWidth: 150,
            frameHeight: 150,
        })
        this.load.spritesheet('nighttoday', '150x150nighttodayspritesheet.png', {
            frameWidth: 150,
            frameHeight: 150,
        })
    }

    create() {
        this.textconfig = {
            fontFamily: 'Handwriting',
            fontSize: '35px',
            color: '#727272',
            padding: {
                top: 5,
                bottom: 5,
                right: 15
            },
        }

        // preload font
        this.add.text(-1000, -1000, '.', { fontFamily: 'Handwriting' });

        document.fonts.ready.then(() => {
            this.add.text(120, 80, 'Mental Health:', this.textconfig)
            this.add.text(450, 80, 'Physical Health:', this.textconfig)
            this.add.text(230, 260, 'Exam Preparedness:', this.textconfig)
            // post it note text
            this.add.text(577, 180, 'All work and \nno play makes \nJack a dull boy', this.textconfig)
        })

        // add images
        this.background = this.add.tileSprite(0, 0, 800, 600, 'background').setOrigin(0).setDepth(0)
        this.postitnote = this.add.tileSprite(550, 169, 250, 250, 'postitnote').setOrigin(0).setDepth(0)

        // add spritesheets
        this.mentalhealth = this.add.sprite(230, 151, 'mentalhealth', 0)
        this.physicalhealth = this.add.sprite(570, 151, 'physicalhealth', 0)
        this.exampreparedness = this.add.sprite(360, 327, 'exampreparedness', 0)
        this.button1 = this.add.sprite(280, 450, 'button1', 0).setInteractive()
        this.button2 = this.add.sprite(570, 450, 'button2', 0).setInteractive()
        this.button3 = this.add.sprite(280, 550, 'button3', 0).setInteractive()
        this.button4 = this.add.sprite(570, 550, 'button4', 0).setInteractive()

        // variables
        this.mentalhealthvalue = 0
        this.physicalhealthvalue = 0
        this.exampreparednessvalue = 0

        // button hover events
        this.button1.on('pointerover', () => {
            this.button1.setFrame(1)
        })
        this.button1.on('pointerout', () => {
            this.button1.setFrame(0)
        })
        this.button2.on('pointerover', () => {
            this.button2.setFrame(1)
        })
        this.button2.on('pointerout', () => {
            this.button2.setFrame(0)
        })
        this.button3.on('pointerover', () => {
            this.button3.setFrame(1)
        })
        this.button3.on('pointerout', () => {
            this.button3.setFrame(0)
        })
        this.button4.on('pointerover', () => {
            this.button4.setFrame(1)
        })
        this.button4.on('pointerout', () => {
            this.button4.setFrame(0)
        })

        // button change value events (temp for testing)
        // button 1: -1 mental, button 2: +1 mental,
        // button 3: -1 physical, button 4: +1 physical
        this.button1.on('pointerdown', () => {
            this.mentalhealthvalue -= 1
            this.mentalhealth.setFrame(this.mentalhealthvalue)
        })
        this.button2.on('pointerdown', () => {
            this.mentalhealthvalue += 1
            this.mentalhealth.setFrame(this.mentalhealthvalue)
        })
        this.button3.on('pointerdown', () => {
            this.physicalhealthvalue -= 1
            this.physicalhealth.setFrame(this.physicalhealthvalue)
        })
        this.button4.on('pointerdown', () => {
            this.physicalhealthvalue += 1
            this.physicalhealth.setFrame(this.physicalhealthvalue)
        })
    }

    update() {
    }
}